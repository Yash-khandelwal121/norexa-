import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <>
      <SEOHead title="Refund Policy" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-white">Refund Policy</h1>
        
        <div className="prose prose-slate max-w-none text-slate-300 space-y-6">
          <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-100 mt-8">1. 30-Day Money-Back Guarantee</h2>
          <p>
            We stand behind the quality of our digital products (eBooks, Video Courses, Templates) at Norexa. 
            If you are not completely satisfied with your purchase for any reason, we offer a full, no-questions-asked refund within 30 days of your original purchase date.
          </p>

          <h2 className="text-2xl font-bold text-slate-100 mt-8">2. How to Request a Refund</h2>
          <p>To request a refund within the 30-day window, simply follow these steps:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Reply to your original purchase confirmation email and state that you would like a refund.
            </li>
            <li>
              Alternatively, you can reach out to our Technical Support Team via the Contact page with your Order Number and Email Address.
            </li>
            <li>
              Once we receive your request, your refund will be processed immediately and the funds will be returned to your original payment method within 3-5 business days.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-100 mt-8">3. Access Revocation</h2>
          <p>
            Please note that upon receiving your full refund, your access to the digital product(s) (including Google Drive folders) will be permanently revoked.
          </p>
          <p>
            If you have any questions or concerns about these policies, please reach out via our <Link to="/contact" className="text-primary hover:underline">Contact Support</Link> page.
          </p>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
