import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import api from '../utils/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEOHead title="Blog | Norexa" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden border-b border-white/10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F5B301]/10 rounded-full blur-[120px]" />
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-6 backdrop-blur-md"
          >
            📰 LATEST INSIGHTS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            Norexa <span className="text-[#F5B301]">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Insights, tutorials, and news from the Norexa team to help you grow your digital business.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-6 lg:px-12 min-h-[50vh]">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5B301]"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
              <p className="text-slate-400">We are currently working on amazing content. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, idx) => (
                <motion.div 
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link to={`/blog/${blog.slug}`} className="block h-full group">
                    <div className="glass-card rounded-3xl border border-white/10 overflow-hidden hover:border-[#F5B301]/40 transition-colors h-full flex flex-col bg-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#F5B301]/0 to-[#F5B301]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Thumbnail */}
                      <div className="aspect-[16/9] w-full overflow-hidden bg-slate-800">
                        {blog.thumbnail ? (
                          <img 
                            src={blog.thumbnail} 
                            alt={blog.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">
                            Norexa
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-1 flex flex-col relative z-10">
                        <div className="text-xs font-semibold text-[#F5B301] mb-3 uppercase tracking-wider">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#F5B301] transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-slate-400 line-clamp-3 mb-6 flex-1">
                          {blog.excerpt || blog.content.substring(0, 120).replace(/<[^>]+>/g, '') + '...'}
                        </p>
                        <div className="inline-flex items-center text-sm font-medium text-white group-hover:text-[#F5B301] transition-colors mt-auto">
                          Read Article
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
