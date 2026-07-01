import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Checkout = () => {
  const { cart, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
    if (user) {
      setEmail(user.email);
    }
  }, [cart, navigate, user]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required to receive access links.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const productIds = cart.map(item => item._id);
      const { data } = await api.post('/payment/create-checkout-session', {
        productIds,
        email
      });
      
      // Redirect to Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during checkout.');
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Checkout" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Secure Checkout</h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
              {error}
            </div>
          )}

          <div className="mb-8 border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-center text-slate-700">
                  <div className="flex items-center space-x-4">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                    )}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xl font-bold">Total Due</span>
              <span className="text-3xl font-black text-slate-900">${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleCheckout}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Delivery Details</h2>
              <p className="text-slate-500 mb-6 text-sm">Where should we send your access links?</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-slate-900"
                    placeholder="you@example.com"
                  />
                </div>
                {!user && (
                  <p className="text-sm text-slate-500">
                    Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a> for faster checkout.
                  </p>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full btn-primary py-4 text-lg flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                'Pay with Stripe'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-400 flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Payments are processed securely by Stripe.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
