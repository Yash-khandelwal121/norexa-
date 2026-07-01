import express from 'express';
import {
  getStats,
  getUsers,
  updateUserRole,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { getOrders } from '../controllers/orderController.js';

const router = express.Router();

// Apply auth and admin middlewares to all routes in this file
router.use(protect);
router.use(admin);

// Stats
router.get('/stats', getStats);

// Users
router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);

// Products
router.get('/products', getAdminProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

// Orders
router.get('/orders', getOrders);

// Blogs
router.get('/blogs', getAdminBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

export default router;
