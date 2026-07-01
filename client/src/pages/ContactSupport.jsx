import SEOHead from '../components/SEOHead';

const ContactSupport = () => {
  return (
    <>
      <SEOHead title="Contact Support" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Contact Support</h1>
          <p className="text-slate-500 text-lg">We're here to help you with any issues or questions.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! We will get back to you soon.'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input type="text" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-slate-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-slate-900" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea required rows="5" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-slate-900" placeholder="How can we help you?"></textarea>
            </div>

            <button type="submit" className="w-full btn-primary py-4 text-lg">
              Send Message
            </button>
          </form>

          <div className="mt-12 text-center text-slate-500 text-sm border-t border-slate-100 pt-8">
            <p className="mb-2">Or email us directly at:</p>
            <a href="mailto:support@norexa.com" className="text-primary font-bold hover:underline">support@norexa.com</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSupport;
