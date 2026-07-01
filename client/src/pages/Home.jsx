import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  PlayCircle, 
  LayoutTemplate, 
  Code2, 
  Sparkles, 
  Briefcase,
  Users,
  Box,
  Star,
  Headphones
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const categories = [
  { id: 'ebook', title: 'eBooks', icon: BookOpen, count: '120+', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'video', title: 'Video Courses', icon: PlayCircle, count: '80+', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 'template', title: 'Templates', icon: LayoutTemplate, count: '150+', color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

const stats = [
  { label: 'Happy Customers', value: '5,000+', icon: Users },
  { label: 'Premium Products', value: '1,200+', icon: Box },
  { label: 'Customer Rating', value: '4.9/5', icon: Star },
  { label: 'Support Available', value: '24/7', icon: Headphones },
];

const Home = () => {
  return (
    <>
      <SEOHead title="Norexa - Premium Digital Resources" />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#F5B301]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 overflow-hidden max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8 relative z-10"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-max backdrop-blur-md">
              <Star className="w-4 h-4 text-[#F5B301] fill-[#F5B301]" />
              <span className="text-xs font-semibold tracking-wider text-[#F5B301] uppercase">Premium Digital Resources</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.1] tracking-tight text-white">
              Learn.<br/>
              Create.<br/>
              Grow.<br/>
              <span className="text-[#F5B301]">Succeed.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-light">
              Discover high-quality eBooks, video courses, templates and digital resources to unlock your full potential.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-2">
              <Link to="/shop" className="w-full sm:w-auto bg-[#F5B301] text-black font-semibold px-8 py-4 rounded-2xl hover:bg-[#d99d00] transition-all duration-300 shadow-[0_0_30px_rgba(245,179,1,0.3)] hover:shadow-[0_0_40px_rgba(245,179,1,0.5)] hover:-translate-y-1 text-center">
                Explore Products
              </Link>
              <Link to="/shop" className="w-full sm:w-auto bg-white/5 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md text-center flex justify-center items-center space-x-2">
                <span>Browse Categories</span>
                <LayoutTemplate className="w-5 h-5 ml-2 opacity-70" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10 mt-8">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2 text-[#F5B301]">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-sm text-slate-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: 3D Workspace Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative lg:h-[700px] flex items-center justify-center pointer-events-none"
          >
            {/* Soft backdrop glow for the image */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px]" />
            
            <motion.img 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="/premium_workspace.png" 
              alt="Premium Digital Workspace" 
              className="relative z-10 w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-110 lg:scale-125 origin-center"
            />
          </motion.div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative z-10 bg-black/20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Browse Categories</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Find the Right <span className="text-[#F5B301]">Resource</span> for You
              </h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors">
              View All Categories <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link to={cat.fallback || `/shop?type=${cat.id}`} className="block h-full">
                  <div className="glass-card rounded-[18px] p-6 h-full flex flex-row xl:flex-col items-center xl:items-start space-x-4 xl:space-x-0 xl:space-y-6 group hover:bg-white/10 transition-colors">
                    <div className={`p-4 rounded-2xl ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <cat.icon className={`w-8 h-8 ${cat.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{cat.title}</h3>
                      <p className="text-sm text-slate-400">{cat.count} Products</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 md:hidden flex justify-center">
            <Link to="/shop" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center">
              View All Categories <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Extra padding for visual completion of the landing page */}
      <div className="pb-32"></div>
    </>
  );
};

export default Home;
