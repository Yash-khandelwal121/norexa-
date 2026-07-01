import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <>
      <SEOHead title="Blog | Norexa" />
      <div className="max-w-4xl mx-auto px-6 py-24 min-h-[60vh] flex flex-col justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Norexa <span className="text-[#F5B301]">Blog</span>
        </h1>
        <p className="text-lg text-slate-400 mb-12">
          Insights, tutorials, and news from the Norexa team.
        </p>
        
        <div className="glass-card p-12 rounded-2xl border border-white/10">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            We are working hard on bringing you premium content to help you grow your digital business. Check back soon for our first posts!
          </p>
          <Link to="/shop" className="btn-primary py-3 px-8 text-sm">
            Browse Products in the meantime
          </Link>
        </div>
      </div>
    </>
  );
};

export default Blog;
