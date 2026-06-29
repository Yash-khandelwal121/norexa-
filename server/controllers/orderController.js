import Order from '../models/Order.js';

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products', 'title thumbnail type');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get access link for an order's products
// @route   GET /api/orders/:id/access
// @access  Private
export const getOrderAccess = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products', 'title googleDriveLink');

    if (order) {
      // Check if order belongs to user
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to access this order' });
      }

      if (order.status !== 'paid') {
        return res.status(400).json({ message: 'Order is not paid' });
      }

      // Return products with googleDriveLink
      res.json(order.products);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').populate('products', 'title');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
