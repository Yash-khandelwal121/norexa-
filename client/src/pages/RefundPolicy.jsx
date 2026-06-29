import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <>
      <SEOHead title="Refund Policy" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Refund Policy</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8">1. Digital Products</h2>
          <p>
            Because Norexa offers irrevocable digital goods (eBooks, Video Courses, Templates), we do not generally issue refunds once the order is completed and the product access link has been delivered. 
            As a customer, you are responsible for understanding this upon purchasing any item at our site.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">2. Exceptions</h2>
          <p>We realize that exceptional circumstance can take place with regard to the character of the product we supply. Therefore, we do honor requests for a refund on the following reasons:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Non-delivery of the product:</strong> due to some mailing issues of your e-mail provider or your own mail server you might not receive a delivery e-mail from us. In this case we recommend contacting us for assistance. Claims for non-delivery must be submitted within 7 days from the order placing date.
            </li>
            <li>
              <strong>Major defects:</strong> although all the products are thoroughly tested before release, unexpected errors may occur. Such issues must be submitted for our Technical Support Team's approval. 
            </li>
            <li>
              <strong>Product not-as-described:</strong> such issues should be reported to our Technical Support Department within 7 days from the date of the purchase. Clear evidence must be provided proving that the purchased product is not as it is described on the website.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8">3. Contact Us</h2>
          <p>
            Please note that we do not bear any responsibility and therefore we do not satisfy any refund/return/exchange requests based on incompatibility of our products with some third-party software (plug-ins, add-ons, modules, search engines, scripts, extensions etc) other than those which are specified as compatible in a description available on the preview page of each product.
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
