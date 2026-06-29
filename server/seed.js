import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Order from './models/Order.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing products and categories...');
    await Product.deleteMany();
    await Category.deleteMany();

    console.log('Inserting dummy data...');

    // 1. Create Categories
    const categories = await Category.insertMany([
      { name: 'eBooks', slug: 'ebooks', description: 'Comprehensive text resources' },
      { name: 'Video Courses', slug: 'video-courses', description: 'Step-by-step video tutorials' },
      { name: 'Templates', slug: 'templates', description: 'Ready-to-use design and code templates' },
    ]);

    const [ebookCat, videoCat, templateCat] = categories;

    // 2. Create Products
    const products = [
      {
        title: 'Full-Stack Web Development Handbook',
        slug: 'full-stack-web-dev-handbook',
        description: 'A complete guide to mastering the MERN stack from zero to hero. Contains over 500 pages of advanced patterns and best practices.',
        shortDescription: 'Master the MERN stack with this 500-page comprehensive guide.',
        price: 29.99,
        comparePrice: 49.99,
        category: ebookCat._id,
        type: 'ebook',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
        googleDriveLink: 'https://drive.google.com/drive/folders/dummy-link-1',
        tags: ['webdev', 'mern', 'javascript'],
        isFeatured: true,
        isPublished: true,
      },
      {
        title: 'React Performance Masterclass',
        slug: 'react-performance-masterclass',
        description: 'Learn how to optimize your React applications for speed and scale. Includes 10 hours of premium video content and exercises.',
        shortDescription: '10-hour video course on optimizing React applications.',
        price: 89.99,
        comparePrice: 129.99,
        category: videoCat._id,
        type: 'video',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
        googleDriveLink: 'https://drive.google.com/drive/folders/dummy-link-2',
        tags: ['react', 'performance', 'frontend'],
        isFeatured: true,
        isPublished: true,
      },
      {
        title: 'Modern SaaS Dashboard UI Kit',
        slug: 'modern-saas-dashboard-ui-kit',
        description: 'A beautiful, pixel-perfect Tailwind CSS dashboard template for your next SaaS project. Fully responsive and accessible.',
        shortDescription: 'Tailwind CSS SaaS dashboard template.',
        price: 49.00,
        category: templateCat._id,
        type: 'template',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        googleDriveLink: 'https://drive.google.com/drive/folders/dummy-link-3',
        tags: ['ui', 'tailwindcss', 'design'],
        isFeatured: true,
        isPublished: true,
      },
      {
        title: 'Python for Data Science Primer',
        slug: 'python-data-science-primer',
        description: 'Get started with data analysis and visualization using Python, Pandas, and Matplotlib. Perfect for beginners.',
        shortDescription: 'Beginner friendly guide to Data Science with Python.',
        price: 19.99,
        category: ebookCat._id,
        type: 'ebook',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop',
        googleDriveLink: 'https://drive.google.com/drive/folders/dummy-link-4',
        tags: ['python', 'data', 'beginner'],
        isFeatured: false,
        isPublished: true,
      },
    ];

    await Product.insertMany(products);

    console.log('Dummy data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
