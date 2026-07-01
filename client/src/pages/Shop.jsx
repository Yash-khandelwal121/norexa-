import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters initialized from URL
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  // Sync state if URL changes (e.g. clicking footer links while already on /shop)
  useEffect(() => {
    setType(searchParams.get('type') || '');
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = `/products?`;
      if (search) query += `search=${search}&`;
      if (type) query += `type=${type}&`;
      if (sort) query += `sort=${sort}&`;
      
      const { data } = await api.get(query);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [type, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (search) prev.set('search', search);
      else prev.delete('search');
      return prev;
    });
    fetchProducts();
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setSearchParams(prev => {
      if (newType) prev.set('type', newType);
      else prev.delete('type');
      return prev;
    });
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setSearchParams(prev => {
      if (newSort) prev.set('sort', newSort);
      else prev.delete('sort');
      return prev;
    });
  };

  return (
    <>
      <SEOHead title="Shop All Resources" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Shop Resources</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4 text-lg">Search</h3>
              <form onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 placeholder-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="w-full mt-3 btn-secondary py-2 text-sm">Search</button>
              </form>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4 text-lg">Resource Type</h3>
              <div className="space-y-3">
                {['', 'ebook', 'video', 'template', 'bundle'].map((t) => (
                  <label key={t} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value={t}
                      checked={type === t}
                      onChange={(e) => handleTypeChange(e.target.value)}
                      className="form-radio h-4 w-4 text-primary border-slate-300 focus:ring-primary"
                    />
                    <span className="text-slate-200 capitalize">{t === '' ? 'All Types' : t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4 text-lg">Sort By</h3>
              <select 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-100">
                    No products found matching your criteria.
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Shop;
