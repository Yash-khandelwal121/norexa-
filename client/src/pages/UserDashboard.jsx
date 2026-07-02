import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeAccessLink, setActiveAccessLink] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleGetAccess = async (orderId) => {
    try {
      const { data } = await api.get(`/orders/${orderId}/access`);
      setActiveAccessLink(data);
    } catch (err) {
      alert('Error fetching access links. Ensure this order is paid.');
    }
  };

  return (
    <>
      <SEOHead title="My Dashboard" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-slate-500 text-lg">Here are all the premium resources you've unlocked.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">No purchases yet</h2>
            <p className="text-slate-500 mb-8">Head over to the shop to discover our premium resources.</p>
            <Link to="/shop" className="btn-primary">
              Explore the Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Order Date</p>
                    <p className="font-bold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Amount</p>
                    <p className="font-bold text-slate-900">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-1 ${
                      order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    {order.status === 'paid' && (
                      <button 
                        onClick={() => handleGetAccess(order._id)}
                        className="btn-primary py-2 px-6 text-sm"
                      >
                        Get Access Links
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-bold mb-4 text-lg">Products in this order:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {order.products.map(product => (
                      <div key={product._id} className="flex items-center gap-4 border border-slate-100 p-4 rounded-2xl">
                         {product.thumbnail ? (
                            <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded-xl" />
                          ) : (
                            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">No Img</div>
                          )}
                          <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">{product.type}</span>
                            <p className="font-bold text-slate-800 line-clamp-2">{product.title}</p>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Access Link Modal */}
      {activeAccessLink && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setActiveAccessLink(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold mb-6">Your Access Links</h3>
            <p className="text-slate-600 mb-8">Click the links below to access your files on Google Drive.</p>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {activeAccessLink.map(product => (
                <div key={product._id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{product.title}</h4>
                  </div>
                  <a 
                    href={product.googleDriveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary py-2 px-6 whitespace-nowrap text-center"
                  >
                    Open Drive Folder &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
