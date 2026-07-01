import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';

const ContactSupport = () => {
  return (
    <>
      <SEOHead title="Contact Support" />
      <div className="min-h-screen relative overflow-hidden pb-24">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5B301]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight"
            >
              Get in <span className="text-[#F5B301]">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Have a question or need assistance? Our support team is here to help you. Fill out the form below and we'll get back to you as soon as possible.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-[#0A1020] rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-sm hover:border-[#F5B301]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F5B301]/10 rounded-xl flex items-center justify-center mb-6">
                  <Mail className="text-[#F5B301] w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-slate-400 text-sm mb-4">Our friendly team is here to help.</p>
                <a href="mailto:support@norexa.com" className="text-white font-medium hover:text-[#F5B301] transition-colors">support@norexa.com</a>
              </div>

              <div className="bg-[#0A1020] rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-sm hover:border-[#F5B301]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F5B301]/10 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="text-[#F5B301] w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                <p className="text-slate-400 text-sm mb-4">Come say hello at our office HQ.</p>
                <p className="text-white font-medium">123 Innovation Drive<br />Tech City, TC 10020</p>
              </div>

              <div className="bg-[#0A1020] rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-sm hover:border-[#F5B301]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F5B301]/10 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="text-[#F5B301] w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Working Hours</h3>
                <p className="text-slate-400 text-sm mb-4">Mon-Fri from 9am to 6pm.</p>
                <p className="text-white font-medium">Weekend: Closed</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-[#0A1020]/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-8">Send us a message</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! We will get back to you soon.'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                    <input type="text" required placeholder="John" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#F5B301] outline-none text-white placeholder-slate-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#F5B301] outline-none text-white placeholder-slate-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#F5B301] outline-none text-white placeholder-slate-500 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea required rows="6" placeholder="How can we help you today?" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#F5B301] outline-none text-white placeholder-slate-500 transition-all resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-[#F5B301] text-black font-bold py-4 rounded-xl hover:bg-[#d99d00] transition-colors shadow-lg shadow-[#F5B301]/20">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSupport;
