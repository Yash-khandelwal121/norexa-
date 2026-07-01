import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 mt-auto border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="block mb-6">
              <img src="/logo2.png" alt="Norexa Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Premium digital products to elevate your skills. Unlock your potential with our curated selection of top-tier resources.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/shop?type=ebook" className="hover:text-primary transition-colors">eBooks</Link></li>
              <li><Link to="/shop?type=video" className="hover:text-primary transition-colors">Video Courses</Link></li>
              <li><Link to="/shop?type=template" className="hover:text-primary transition-colors">Templates</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Norexa. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span>Powered by Stripe</span>
            <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="40" height="16" className="text-slate-500 fill-current"><path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.89-1.08-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.91 7.6-5.65 7.6zM40 8.95c-1.68 0-2.88 1.27-2.88 3.58 0 2.46 1.22 3.83 2.9 3.83 1.46 0 3.01-1.15 3.01-3.81 0-2.53-1.45-3.6-3.03-3.6zM28.46 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.91 7.6-5.65 7.6zM27.51 8.95c-1.68 0-2.88 1.27-2.88 3.58 0 2.46 1.22 3.83 2.9 3.83 1.46 0 3.01-1.15 3.01-3.81 0-2.53-1.45-3.6-3.03-3.6zM15.42 12.81c0-1.8-.7-2.48-2.05-2.48s-2.17.68-2.17 2.48v6.78H7.1V5.57h3.77l.08 1.07c.87-1.18 2.05-1.34 3.12-1.34 1.76 0 5.48.96 5.48 6.4v7.9h-4.13v-6.79zM5.38 2.63A2.32 2.32 0 0 1 3.04 5 2.33 2.33 0 0 1 .71 2.63 2.33 2.33 0 0 1 3.04.28c1.3 0 2.34 1.05 2.34 2.35zm-4.32 17L5.2 5.58H1.05z"></path></svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
