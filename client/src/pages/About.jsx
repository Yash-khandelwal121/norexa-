import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <SEOHead title="About Us | Norexa" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-[#F5B301]/10 rounded-full blur-[100px]" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#F5B301]/10 border border-[#F5B301]/20 text-[#F5B301] text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md"
            >
              ✨ Our Story
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Empowering the next <br className="hidden md:block" />
              generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B301] to-yellow-300">Creators.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
            >
              Norexa is a premium digital marketplace dedicated to providing high-quality educational resources, tools, and assets for modern professionals and creative minds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="/shop" className="btn-primary py-4 px-10 text-lg inline-flex items-center">
                Explore Premium Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-[#F5B301]/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              src="/images/about-hero.png" 
              alt="Norexa Creators Inspiration" 
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute bottom-6 left-6 z-20">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <p className="text-white font-bold text-xl">10k+ Creators</p>
                <p className="text-[#F5B301] font-semibold text-sm">Building the future today</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 md:p-14 rounded-3xl border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Our Mission</h2>
            <p className="text-slate-400 text-lg leading-relaxed relative z-10">
              We believe that access to top-tier digital resources shouldn't be complicated or fragmented. Our mission is to curate and deliver the most impactful eBooks, courses, and templates in one seamless platform, enabling you to learn and execute faster.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-10 md:p-14 rounded-3xl border border-[#F5B301]/20 hover:border-[#F5B301]/40 transition-colors relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5B301]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-3xl font-bold text-[#F5B301] mb-6 relative z-10">Our Vision</h2>
            <p className="text-slate-400 text-lg leading-relaxed relative z-10">
              To become the global standard for premium digital goods. We envision a future where creators and entrepreneurs can instantly access world-class knowledge and tools to bring their boldest ideas to life without barriers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-12 bg-white/5 border-y border-white/10">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Core Values</h2>
          <p className="text-slate-400 text-lg">The principles that guide everything we build.</p>
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Quality First", desc: "Every product is meticulously reviewed for exceptional standard." },
            { title: "Creator Centric", desc: "Built to empower your workflow and elevate your final output." },
            { title: "Continuous Growth", desc: "Always evolving, always bringing you the latest in digital education." }
          ].map((val, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5B301]/10 flex items-center justify-center mb-6">
                <div className="w-4 h-4 rounded-full bg-[#F5B301]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{val.title}</h3>
              <p className="text-slate-400">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to elevate your work?</h2>
          <p className="text-xl text-slate-400 mb-10">Join thousands of creators who are already using Norexa resources to grow their business.</p>
          <a href="/shop" className="btn-primary py-4 px-10 text-lg inline-flex items-center">
            Explore Premium Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
