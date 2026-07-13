import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

connectDB();

const app = express();

// Stripe webhook needs raw body, so we set it up before express.json()
app.post(
  '/api/payment/webhook',
  express.raw({ type: 'application/json' }),
  (req, res, next) => {
    // This will be handled by the paymentController
    next();
  }
);

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://www.norexa.online',
  'https://norexa.online',
  'https://norexa-five.vercel.app'
];

if (process.env.CLIENT_URL && !allowedOrigins.includes(process.env.CLIENT_URL)) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.send('Norexa API is running...');
});

// Seed an initial admin user if none exists
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@norexa.com',
        password: 'password123', // Remember to change this!
        role: 'admin',
      });
      console.log('Default admin user seeded: admin@norexa.com / password123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};
mongoose.connection.once('open', seedAdmin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Triggering a restart to load new .env variables
