import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Search, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-sm font-medium text-white border-b-2 border-[#F5B301] pb-1"
      : "text-sm font-medium text-slate-300 hover:text-white transition-colors pb-1 border-b-2 border-transparent";
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#070B16]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold tracking-tight text-white flex items-center">
                <span className="text-[#F5B301] mr-1">N</span>orexa
              </span>
            </Link>
          </div>
          
          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/shop" className={getLinkClass('/shop')}>Shop</Link>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center pb-1 border-b-2 border-transparent group-hover:text-white">
                Categories <span className="ml-1 text-[10px]">▼</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-[#070B16] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left flex flex-col py-2 z-50">
                <Link to="/shop?type=ebook" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors">eBooks</Link>
                <Link to="/shop?type=video" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors">Video Courses</Link>
                <Link to="/shop?type=template" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors">Templates</Link>
                <Link to="/shop" className="px-4 py-2 text-sm text-[#F5B301] hover:bg-white/10 transition-colors border-t border-white/10 mt-1 pt-3">View All Resources</Link>
              </div>
            </div>
            <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
            <Link to="/blog" className={getLinkClass('/blog')}>Blog</Link>
            <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
          </div>

          {/* Right: Search, Cart, Login */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-white/20 transition-colors w-64"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <Link to="/cart" className="relative text-slate-300 hover:text-[#F5B301] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F5B301] text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Admin</Link>
                )}
                <button onClick={logout} className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="bg-[#F5B301] text-black font-semibold py-2.5 px-6 rounded-full hover:bg-[#d99d00] transition-colors shadow-lg shadow-[#F5B301]/20 text-sm">
                  Login / Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
