import React, { useState } from 'react';
import { CreditCard, Smartphone, Lock, ArrowLeft } from 'lucide-react';
import { CartItem, Page } from '../types';

interface PaymentPageProps {
  cart: CartItem[];
  onPaymentComplete: (address: string) => void;
  onPageChange: (page: Page) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ cart, onPaymentComplete, onPageChange }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  // UPI form state
  const [upiId, setUpiId] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentComplete('123 Main Street, Koramangala, Bangalore - 560034');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => onPageChange('checkout')}
          className="flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Checkout
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
        <p className="text-gray-600">Secure payment powered by industry-standard encryption</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Payment Method Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              paymentMethod === 'card'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CreditCard size={20} />
            <span>Card Payment</span>
          </button>
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              paymentMethod === 'upi'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Smartphone size={20} />
            <span>UPI Payment</span>
          </button>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name on Card
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* UPI Payment Form */}
        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@paytm"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-800">
                <strong>Popular UPI Apps:</strong> PhonePe, Google Pay, Paytm, BHIM
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-center space-x-2 mt-6 p-4 bg-gray-50 rounded-lg">
          <Lock size={16} className="text-gray-600" />
          <span className="text-sm text-gray-600">
            Your payment information is encrypted and secure
          </span>
        </div>

        {/* Order Total */}
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Pay ₹{total}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;