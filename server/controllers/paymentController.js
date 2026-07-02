import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a Stripe Checkout Session
// @route   POST /api/payment/create-checkout-session
// @access  Public (Guest or Logged in)
export const createCheckoutSession = async (req, res) => {
  try {
    const { productIds, email } = req.body;
    let userId = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.error('Invalid token for guest checkout', err);
      }
    }

    if (!productIds || productIds.length === 0) {
      return res.status(400).json({ message: 'No products in cart' });
    }

    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Products not found' });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          images: (product.thumbnail && product.thumbnail.startsWith('http')) ? [product.thumbnail] : [],
        },
        unit_amount: Math.round(product.price * 100), // Stripe requires cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart`,
      customer_email: email,
      metadata: {
        userId: userId || 'guest',
        email: email,
        productIds: JSON.stringify(productIds),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Handle Stripe Webhook
// @route   POST /api/payment/webhook
// @access  Public
export const stripeWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const { userId, email, productIds } = session.metadata;
      const parsedProductIds = JSON.parse(productIds);
      
      const totalAmount = session.amount_total / 100;

      // Create Order
      const newOrder = await Order.create({
        user: userId === 'guest' ? undefined : userId,
        email: email,
        products: parsedProductIds,
        totalAmount,
        stripePaymentIntentId: session.payment_intent,
        stripeSessionId: session.id,
        status: 'paid',
      });

      // Update User if logged in
      if (userId !== 'guest') {
        await User.findByIdAndUpdate(userId, {
          $push: { purchasedProducts: { $each: parsedProductIds } },
        });
      }

      // Fetch products to send email
      const products = await Product.find({ _id: { $in: parsedProductIds } });
      
      // Generate email content
      let productLinksHtml = '';
      products.forEach((product) => {
        productLinksHtml += `
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
            <h3 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 700; margin-bottom: 20px;">${product.title}</h3>
            <a href="${product.googleDriveLink}" style="display: inline-block; padding: 14px 28px; background-color: #F5B301; color: #070B16; font-weight: 700; text-decoration: none; border-radius: 8px; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(245, 179, 1, 0.2);">
              Access Google Drive Folder &rarr;
            </a>
          </div>
        `;
      });

      const message = `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="text-align: center; padding: 40px 0 20px 0;">
            <h1 style="color: #070B16; font-size: 32px; margin: 0; font-weight: 900; letter-spacing: -1px;">Norexa</h1>
          </div>
          
          <div style="padding: 0 40px;">
            <h2 style="color: #0f172a; font-size: 24px; margin-top: 0;">Your Purchase is Ready! 🎉</h2>
            <p style="font-size: 16px;">Thank you for your order! Your payment was successful, and your premium digital resources are ready to be accessed below.</p>
            
            <div style="margin: 40px 0;">
              ${productLinksHtml}
            </div>
            
            <p style="font-size: 14px; color: #64748b; background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center;">
              <strong>Note:</strong> These links grant you view/download access to the files. Please keep this email safe for future reference.
            </p>
          </div>
          
          <div style="margin-top: 48px; padding: 40px 32px; background-color: #070B16; color: #94a3b8; text-align: center;">
            <p style="margin-top: 0; font-weight: 600; color: #e2e8f0; font-size: 16px;">Norexa Support</p>
            <p style="font-size: 14px; margin-bottom: 32px;">Need help? Reply directly to this email.</p>
            
            <div style="font-size: 13px; line-height: 1.8;">
              <p style="margin: 0 0 16px 0; color: #cbd5e1;"><strong>30-Day Money-Back Guarantee</strong><br/>If you're not satisfied, we offer a full refund within 30 days of purchase. No questions asked.</p>
              <div>
                <a href="${process.env.CLIENT_URL || 'https://norexa.onrender.com'}/terms" style="color: #F5B301; text-decoration: none; margin: 0 10px;">Terms & Conditions</a> | 
                <a href="${process.env.CLIENT_URL || 'https://norexa.onrender.com'}/privacy" style="color: #F5B301; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                <a href="${process.env.CLIENT_URL || 'https://norexa.onrender.com'}/refund" style="color: #F5B301; text-decoration: none; margin: 0 10px;">Refund Policy</a>
              </div>
            </div>
          </div>
        </div>
      `;

      // Send Email
      await sendEmail({
        email: email,
        subject: 'Your Norexa Purchase — Access Inside 🎉',
        message: message,
      });

      // Mark order as email sent
      newOrder.accessEmailSent = true;
      await newOrder.save();

      console.log(`Order ${newOrder._id} processed and email sent to ${email}`);
    } catch (err) {
      console.error('Error processing webhook data:', err);
      // We still return 200 to Stripe so it doesn't retry endlessly, 
      // but in production we'd want better error tracking here.
    }
  }

  res.status(200).send('Webhook received successfully');
};
