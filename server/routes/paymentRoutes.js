import express from 'express';
import { createCheckoutSession, stripeWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// The webhook needs to be mounted in server.js directly because it requires raw body
// We export the controller logic instead

router.post('/create-checkout-session', createCheckoutSession);
router.post('/webhook', stripeWebhook);

export default router;
