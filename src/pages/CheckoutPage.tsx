import React, { useState } from 'react';
import { MapPin, CreditCard, Smartphone, Banknote, ArrowRight } from 'lucide-react';
import { CartItem, Page } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onPageChange: (page: Page) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onPageChange }) => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi'>('cod');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 200 ? 0 : 20;
  const total = subtotal + deliveryFee;

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setIsAddressValid(value.trim().length > 10);
  };

  const handleContinueToPayment = () => {
    if (paymentMethod === 'cod') {
      // For COD, complete the order directly
      onPageChange('track-order');
    } else {
      // For other payment methods, go to payment page
      onPageChange('payment');
    }
  };

  const paymentMethods = [
    {
      id: 'cod' as const,
      name: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when your order arrives'
    },
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi' as const,
      name: 'UPI',
      icon: Smartphone,
      description: 'PhonePe, Google Pay, Paytm'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Review your order and complete purchase</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin size={20} className="mr-2 text-green-600" />
              Delivery Address
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  placeholder="Enter your complete address with landmark"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={3}
                />
                {address.length > 0 && !isAddressValid && (
                  <p className="mt-1 text-sm text-red-600">Please enter a complete address</p>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <span>Current location: </span>
                <span className="font-medium text-gray-800 ml-1">Koramangala, Bangalore</span>
                <button className="text-green-600 ml-2 hover:underline">Change</button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="sr-only"
                    />
                    <Icon size={24} className={`mr-3 ${paymentMethod === method.id ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                      <div className={`font-medium ${paymentMethod === method.id ? 'text-green-900' : 'text-gray-900'}`}>
                        {method.name}
                      </div>
                      <div className={`text-sm ${paymentMethod === method.id ? 'text-green-700' : 'text-gray-500'}`}>
                        {method.description}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Delivery Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm text-green-800">
              <strong>Fast Delivery:</strong> We deliver in 15–30 minutes to your doorstep!
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            {/* Items */}
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleContinueToPayment}
                disabled={!isAddressValid}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>
                  {paymentMethod === 'cod' ? 'Place Order' : 'Continue to Payment'}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;