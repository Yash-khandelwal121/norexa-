import SEOHead from '../components/SEOHead';

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead title="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8">1. Introduction</h2>
          <p>
            Welcome to Norexa. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">2. The Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and billing address.</li>
            <li><strong>Financial Data:</strong> We do not store your credit card details. All payment processing is handled securely by Stripe.</li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            To process and deliver your order, manage your account, and provide customer support.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
          </p>

          <p className="mt-12 text-sm text-slate-500">
            If you have any questions about this privacy policy, please contact us via our Support page.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
