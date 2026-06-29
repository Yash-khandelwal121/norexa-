import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="Your Cart" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added any resources to your cart yet.</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 relative">
                  <Link to={`/products/${item.slug}`} className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                    )}
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">{item.type}</span>
                        <Link to={`/products/${item.slug}`} className="text-xl font-bold text-slate-900 hover:text-primary transition-colors block mb-2">
                          {item.title}
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-slate-400 hover:text-red-500 p-2 -mr-2 transition-colors"
                        title="Remove from cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-xl font-bold text-slate-900">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-slate-50 rounded-3xl p-8 sticky top-24 border border-slate-200">
                <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-3xl font-black text-slate-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary py-4 text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
