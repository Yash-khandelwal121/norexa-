import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Norexa Logo" className="h-16 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/shop" className="text-slate-600 hover:text-primary transition-colors">Shop</Link>
            
            <Link to="/cart" className="relative text-slate-600 hover:text-primary transition-colors">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-slate-600 hover:text-primary transition-colors">Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-slate-600 hover:text-primary transition-colors">Admin</Link>
                )}
                <button onClick={logout} className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-slate-600 hover:text-primary transition-colors">Login</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm rounded-lg">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
