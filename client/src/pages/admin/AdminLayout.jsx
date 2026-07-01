import { Link, useLocation } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Blogs', path: '/admin/blogs' },
  ];

  return (
    <>
      <SEOHead title="Admin Panel" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-slate-900 rounded-3xl p-6 shadow-xl text-white sticky top-24">
            <h2 className="text-xl font-bold mb-8 tracking-wide uppercase text-slate-400 text-sm">Admin Panel</h2>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-2' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Admin Content */}
        <main className="flex-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
