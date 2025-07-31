import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { CartItem, Page } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onPageChange: (page: Page) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onQuantityChange, onPageChange }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 200 ? 0 : 20;
  const total = subtotal - discount + deliveryFee;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(Math.min(50, subtotal * 0.1));
      setAppliedCoupon('WELCOME10');
    } else if (couponCode.toLowerCase() === 'save20') {
      setDiscount(Math.min(100, subtotal * 0.2));
      setAppliedCoupon('SAVE20');
    }
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    onPageChange('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <button
            onClick={() => onPageChange('categories')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
        <p className="text-gray-600">{cart.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            {cart.map((item, index) => (
              <div key={item.id} className={`p-6 ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-gray-900">₹{item.price}</span>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-medium min-w-[24px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onQuantityChange(item.id, 0)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Tag size={20} className="mr-2 text-green-600" />
              Apply Coupon
            </h3>
            
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                <div>
                  <span className="font-medium text-green-800">{appliedCoupon} applied</span>
                  <div className="text-sm text-green-700">You saved ₹{discount}</div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            
            <div className="mt-3 text-sm text-gray-600">
              Try: WELCOME10 (10% off) or SAVE20 (20% off)
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              {subtotal <= 200 && (
                <div className="text-sm text-gray-500">
                  Add ₹{200 - subtotal} more for free delivery
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>Estimated delivery: </span>
                <span className="font-medium text-green-600 ml-1">15-20 mins</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;