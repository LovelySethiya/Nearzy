import React from 'react';
import { ShoppingCart, User, Home, Grid3X3, Package, LogIn, Settings } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  cartItemsCount: number;
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, cartItemsCount, isAdmin = false }) => {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'categories' as Page, label: 'Categories', icon: Grid3X3 },
    { id: 'cart' as Page, label: 'Cart', icon: ShoppingCart, badge: cartItemsCount },
    { id: 'track-order' as Page, label: 'Orders', icon: Package },
    { id: 'login' as Page, label: 'Profile', icon: User },
    ...(isAdmin ? [{ id: 'admin' as Page, label: 'Admin', icon: Settings }] : [])
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onPageChange('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Nearzy</span>
            <span className="text-xs text-gray-500 ml-1 hidden sm:block">From local shops to your doorstep – fast!</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                    currentPage === item.id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-green-600">
              <Grid3X3 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center p-2 relative ${
                  currentPage === item.id ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;