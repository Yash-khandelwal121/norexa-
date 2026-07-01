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
          <div style="margin-bottom: 20px;">
            <h3>${product.title}</h3>
            <p><a href="${product.googleDriveLink}" style="padding: 10px 15px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">Access Google Drive Folder</a></p>
          </div>
        `;
      });

      const message = `
        <h1>Your Norexa Purchase — Access Inside 🎉</h1>
        <p>Thank you for your purchase!</p>
        <p>Here are the access links to your digital products:</p>
        ${productLinksHtml}
        <p><em>Note: This link grants you view/download access. Keep this email safe.</em></p>
        <hr />
        <p>Norexa Support</p>
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
