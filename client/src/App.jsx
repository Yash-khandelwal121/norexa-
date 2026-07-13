import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import UserDashboard from './pages/UserDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactSupport from './pages/ContactSupport';
import RefundPolicy from './pages/RefundPolicy';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

import ScrollToTop from './components/ScrollToTop';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBlogs from './pages/admin/AdminBlogs';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/refunds" element={<RefundPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="*" element={<NotFound />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
              <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
              <Route path="/admin/blogs" element={<AdminLayout><AdminBlogs /></AdminLayout>} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
