import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CartContext } from '../context/CartContext';
import api from '../utils/api';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{error}</h2>
        <button onClick={() => navigate('/shop')} className="text-primary hover:underline">
          &larr; Back to Shop
        </button>
      </div>
    );
  }

  const inCart = cart.some(item => item._id === product._id);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <>
      <SEOHead 
        title={product.metaTitle || product.title} 
        description={product.metaDescription || product.shortDescription} 
        image={product.thumbnail}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-primary mb-8 transition-colors">
          &larr; Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          {/* Image Gallery */}
          <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-8">
            {product.thumbnail ? (
              <img src={product.thumbnail} alt={product.title} className="w-full max-w-md rounded-2xl shadow-lg" />
            ) : (
              <div className="w-full aspect-square bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-widest text-sm font-bold text-primary mb-2">
              {product.type}
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-4">{product.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              {product.comparePrice > product.price && (
                <span className="text-xl text-slate-400 line-through">${product.comparePrice.toFixed(2)}</span>
              )}
            </div>

            <div className="prose prose-slate mb-8 max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-auto">
              {inCart ? (
                <button 
                  onClick={() => navigate('/cart')}
                  className="w-full btn-secondary py-4 text-lg"
                >
                  View in Cart
                </button>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-4 text-lg flex justify-center items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
            
            {product.tags && product.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
