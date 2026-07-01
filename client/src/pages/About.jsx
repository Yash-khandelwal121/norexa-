import SEOHead from '../components/SEOHead';

const About = () => {
  return (
    <>
      <SEOHead title="About Us | Norexa" />
      <div className="max-w-4xl mx-auto px-6 py-24 min-h-[60vh] flex flex-col justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About <span className="text-[#F5B301]">Norexa</span>
        </h1>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          Norexa is a premium digital marketplace dedicated to providing high-quality educational resources, tools, and assets for creators and professionals. Our mission is to help you learn, create, grow, and succeed in the digital world.
        </p>
        <div className="p-8 glass-card rounded-2xl border border-white/10 text-left">
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-slate-400">
            We believe that access to top-tier digital resources shouldn't be complicated. Norexa brings together the best eBooks, video courses, and templates into one seamless, luxurious platform.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
