import React from 'react';
import { CATEGORIES } from '../utils/constants';

interface CategoriesPageProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onCategorySelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h1>
        <p className="text-gray-600">Choose from our wide range of categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`${category.color} p-6 rounded-2xl hover:scale-105 transition-all duration-200 text-center group shadow-sm hover:shadow-lg`}
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <div className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
              {category.name}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Browse all items
            </div>
          </button>
        ))}
      </div>

      {/* Popular Categories Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 4).map((category) => (
            <button
              key={`popular-${category.id}`}
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
    </div>
  );
};

export default CategoriesPage;