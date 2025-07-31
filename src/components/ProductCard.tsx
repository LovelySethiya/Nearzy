import React from 'react';
import { Plus, Minus, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onQuantityChange }) => {
  const handleIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Clock size={12} className="mr-1" />
          {product.eta}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          
          {quantity === 0 ? (
            <button
              onClick={handleIncrease}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span className="font-medium">Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-green-50 rounded-lg p-1">
              <button
                onClick={handleDecrease}
                className="bg-white hover:bg-gray-50 text-green-600 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold text-green-600 min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-white hover:bg-gray-50 text-green-600 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;