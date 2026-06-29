import express from 'express';
import { getMyOrders, getOrderAccess, getOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
// Admin middleware will be imported here later

const router = express.Router();

router.get('/my-orders', protect, getMyOrders);
router.get('/:id/access', protect, getOrderAccess);

// Admin route
// router.get('/', protect, admin, getOrders);

export default router;
