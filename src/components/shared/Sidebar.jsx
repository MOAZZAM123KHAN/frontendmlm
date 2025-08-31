import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  WalletIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Network', path: '/dashboard/network', icon: UsersIcon },
    { name: 'Products', path: '/dashboard/products', icon: ShoppingBagIcon },
    { name: 'Wallet', path: '/dashboard/wallet', icon: WalletIcon },
    { name: 'Commissions', path: '/dashboard/commissions', icon: CurrencyDollarIcon },
    { name: 'Analytics', path: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Support', path: '/dashboard/support', icon: QuestionMarkCircleIcon },
    { name: 'Settings', path: '/dashboard/settings', icon: CogIcon },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo and User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">MP</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-800">MatrixPro</h2>
            <p className="text-xs text-gray-500">ID: 123456</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Current Plan */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-800">Current Plan</p>
          <p className="text-sm font-semibold text-gray-800 mt-1">Premium Package</p>
          <button className="mt-2 w-full text-xs font-medium text-blue-600 hover:text-blue-700 text-left">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;