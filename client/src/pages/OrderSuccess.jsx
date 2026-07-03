import { useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CartContext } from '../context/CartContext';

const OrderSuccess = () => {
  const { clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
    // eslint-disable-next-line
  }, [sessionId]);

  return (
    <>
      <SEOHead title="Order Successful" />
      <div className="flex justify-center items-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Payment Successful!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for your purchase. We have sent an email with the access links to your digital products.
          </p>
          <div className="space-y-4">
            <Link to="/dashboard" className="w-full btn-primary block text-center">
              Go to Dashboard
            </Link>
            <Link to="/shop" className="w-full px-6 py-4 bg-slate-100 text-slate-900 font-semibold rounded-2xl border border-slate-200 hover:bg-slate-200 transition-all block text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
