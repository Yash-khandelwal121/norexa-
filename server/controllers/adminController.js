import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// --- STATS ---
// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    const orders = await Order.find({ status: 'paid' });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- USERS ---
// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- PRODUCTS ---
// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title || 'Sample title',
      slug: req.body.slug || `sample-slug-${Date.now()}`,
      description: req.body.description || 'Sample description',
      price: req.body.price || 0,
      type: req.body.type || 'ebook',
      googleDriveLink: req.body.googleDriveLink || 'http://sample.link',
      isPublished: false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = req.body.title || product.title;
      product.slug = req.body.slug || product.slug;
      product.description = req.body.description || product.description;
      product.shortDescription = req.body.shortDescription || product.shortDescription;
      product.price = req.body.price || product.price;
      product.comparePrice = req.body.comparePrice || product.comparePrice;
      product.category = req.body.category || product.category;
      product.type = req.body.type || product.type;
      product.thumbnail = req.body.thumbnail || product.thumbnail;
      product.googleDriveLink = req.body.googleDriveLink || product.googleDriveLink;
      product.tags = req.body.tags || product.tags;
      if (req.body.isFeatured !== undefined) product.isFeatured = req.body.isFeatured;
      if (req.body.isPublished !== undefined) product.isPublished = req.body.isPublished;
      product.metaTitle = req.body.metaTitle || product.metaTitle;
      product.metaDescription = req.body.metaDescription || product.metaDescription;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (Soft Delete)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isPublished = false;
      await product.save();
      res.json({ message: 'Product soft deleted (unpublished)' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products (including unpublished and googleDriveLink)
// @route   GET /api/admin/products
// @access  Private/Admin
export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

