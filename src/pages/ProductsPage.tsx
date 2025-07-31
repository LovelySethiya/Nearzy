import React, { useState, useMemo } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS, CATEGORIES } from '../utils/constants';

interface ProductsPageProps {
  selectedCategory: string;
  onQuantityChange: (productId: string, quantity: number) => void;
  getProductQuantity: (productId: string) => number;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  selectedCategory,
  onQuantityChange,
  getProductQuantity
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'name'>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Get category name
  const categoryName = useMemo(() => {
    if (selectedCategory === 'all') return 'All Products';
    const category = CATEGORIES.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'Products';
  }, [selectedCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = SAMPLE_PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      products = products.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by price range
    products = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep default order for relevance
        break;
    }

    return products;
  }, [selectedCategory, searchTerm, sortBy, selectedBrands, priceRange]);

  // Get unique brands
  const availableBrands = useMemo(() => {
    const brands = new Set(SAMPLE_PRODUCTS.map(product => product.brand));
    return Array.from(brands).sort();
  }, []);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
        <p className="text-gray-600">{filteredProducts.length} products available</p>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center space-x-2"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableBrands.map(brand => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="mr-2 text-green-600 focus:ring-green-500 rounded"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 px-2 py-1 border border-gray-200 rounded text-sm"
                    min="0"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 px-2 py-1 border border-gray-200 rounded text-sm"
                    min="0"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getProductQuantity(product.id)}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;