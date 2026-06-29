import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Link to={`/products/${product.slug}`} className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 block flex flex-col h-full">
    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
      {product.thumbnail ? (
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">No Image</div>
      )}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
        {product.type}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.shortDescription || product.description}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
        <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">View Details &rarr;</span>
      </div>
    </div>
  </Link>
);

export default ProductCard;
