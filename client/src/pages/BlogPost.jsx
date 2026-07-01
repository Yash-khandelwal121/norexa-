import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import api from '../utils/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`);
        setBlog(data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5B301]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
        <p className="text-slate-400 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="btn-primary py-3 px-8">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={`${blog.title} | Norexa Blog`} />
      
      <article className="min-h-screen pb-24">
        {/* Header Section */}
        <header className="relative pt-32 pb-16 px-6 lg:px-12 border-b border-white/10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#F5B301]/10 rounded-full blur-[150px]" />
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <Link to="/blog" className="inline-flex items-center text-[#F5B301] hover:text-white transition-colors mb-8 text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
            >
              {blog.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-4 text-slate-400"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-[#F5B301] font-bold mr-3 border border-white/10">
                  N
                </div>
                <div className="text-left">
                  <div className="text-sm text-white font-medium">Norexa Team</div>
                  <div className="text-xs">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Thumbnail (if exists) */}
        {blog.thumbnail && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 -mt-12 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
            >
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        )}

        {/* Content Section */}
        <div className={`max-w-3xl mx-auto px-6 lg:px-12 ${blog.thumbnail ? 'pt-20' : 'pt-16'}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-[#F5B301] hover:prose-a:text-yellow-300 prose-img:rounded-2xl"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
