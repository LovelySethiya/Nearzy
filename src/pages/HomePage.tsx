import React from 'react';
import { Search, MapPin, Clock, Star, ArrowRight, Smartphone } from 'lucide-react';
import StoreCard from '../components/StoreCard';
import { SAMPLE_STORES, CATEGORIES } from '../utils/constants';
import { Page } from '../types';

interface HomePageProps {
  onCategorySelect: (categoryId: string) => void;
  onPageChange: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCategorySelect, onPageChange }) => {
  const handleStartShopping = () => {
    onPageChange('categories');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Groceries delivered in
            <span className="text-green-600"> minutes</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            From local shops to your doorstep – fast! Get fresh groceries, snacks, and essentials delivered in 15-30 minutes.
          </p>
          
          {/* Location Section */}
          <div className="flex items-center justify-center mb-6 text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-green-600" />
            <span>Delivering to: </span>
            <span className="font-medium text-gray-800 ml-1">Koramangala, Bangalore</span>
            <button className="text-green-600 ml-2 hover:underline">Change</button>
          </div>

          <button
            onClick={handleStartShopping}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Start Shopping</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for items, brands, or categories"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.slice(0, 8).map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`${category.color} p-4 rounded-xl hover:scale-105 transition-all duration-200 text-center group`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Nearby Stores */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Nearby Stores</h2>
          <button className="text-green-600 hover:text-green-700 font-medium">View All</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {SAMPLE_STORES.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">15-30 min delivery</h3>
            <p className="text-gray-600">Ultra-fast delivery from local stores near you</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-orange-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600">Fresh products from trusted local partners</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
            <p className="text-gray-600">Track your order in real-time until delivery</p>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-gradient-to-r from-green-600 to-orange-600 rounded-2xl p-8 text-white mb-12">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Get the Nearzy App</h3>
            <p className="mb-4 opacity-90">Order groceries on the go!</p>
            <div className="flex space-x-4">
              <button className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <Smartphone size={20} />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              <button className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <Smartphone size={20} />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;