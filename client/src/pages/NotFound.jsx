import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const NotFound = () => {
  return (
    <>
      <SEOHead title="Page Not Found" />
      <div className="flex flex-col justify-center items-center py-32 px-4 text-center">
        <h1 className="text-9xl font-black text-slate-100 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary px-8 py-3">
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
