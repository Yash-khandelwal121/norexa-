import SEOHead from '../components/SEOHead';

const TermsOfService = () => {
  return (
    <>
      <SEOHead title="Terms of Service" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none text-slate-300 space-y-6">
          <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-100 mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Norexa, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h2 className="text-2xl font-bold text-slate-100 mt-8">2. Digital Products License</h2>
          <p>
            When you purchase a digital product from Norexa (including eBooks, Video Courses, and Templates), you are granted a non-exclusive, 
            non-transferable, revocable license to access and use the product for your personal and commercial projects, according to the specific 
            license terms provided with each product. You may not redistribute, resell, lease, license, sub-license or offer our products to any third party.
          </p>

          <h2 className="text-2xl font-bold text-slate-100 mt-8">3. Refunds</h2>
          <p>
            Due to the nature of digital products, which cannot be returned, all sales are considered final and non-refundable once the 
            Google Drive access link has been dispatched to you, unless the product is significantly not as described.
          </p>

          <h2 className="text-2xl font-bold text-slate-100 mt-8">4. User Accounts</h2>
          <p>
            To access your purchased products, you must create an account. You are responsible for maintaining the confidentiality of your account 
            and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
