import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Shop', href: '/shop', current: false },
    { name: 'About', href: '/about', current: false },
    { name: 'Contact', href: '/contact', current: false },
  ];

  const userMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
    { name: 'Orders', href: '/orders', icon: ShoppingBagIcon },
    { name: 'Network', href: '/network', icon: UserCircleIcon },
    { name: 'Wallet', href: '/wallet', icon: UserCircleIcon },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-gradient-primary">ShopSmart</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-menu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${item.current ? 'nav-item-active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            {/* Search */}
            <div className="search-container">
              <MagnifyingGlassIcon className="search-icon h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Notifications */}
            <button className="btn btn-ghost btn-sm">
              <BellIcon className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button className="btn btn-ghost btn-sm">
              <HeartIcon className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button className="btn btn-ghost btn-sm relative">
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Help */}
            <button className="btn btn-ghost btn-sm">
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="user-menu">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-avatar hover:bg-primary-700 transition-colors duration-200"
              >
                JD
              </button>
              
              {isUserMenuOpen && (
                <div className="nav-dropdown">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-secondary-200 mt-2 pt-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors duration-200">
                      <UserCircleIcon className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-sm md:hidden"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    item.current
                      ? 'nav-item-active bg-primary-100'
                      : 'nav-item hover:bg-secondary-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;