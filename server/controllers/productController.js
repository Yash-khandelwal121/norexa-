import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, type, search, sort } = req.query;
    
    let query = { isPublished: true };

    if (category) {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    let productsQuery = Product.find(query).select('-googleDriveLink').populate('category', 'name slug');

    if (sort) {
      if (sort === 'price_asc') productsQuery = productsQuery.sort({ price: 1 });
      else if (sort === 'price_desc') productsQuery = productsQuery.sort({ price: -1 });
      else if (sort === 'newest') productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true, isFeatured: true })
      .select('-googleDriveLink')
      .limit(4);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isPublished: true })
      .select('-googleDriveLink')
      .populate('category', 'name slug');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
