import React, { useState } from 'react';
import { Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { User, Page } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onPageChange: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onPageChange }) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (loginMethod === 'phone' && phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    if (loginMethod === 'email' && !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowOtpInput(true);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check for admin credentials
    const isAdminLogin = (loginMethod === 'email' && email === 'admin@nearzy.com') || 
                        (loginMethod === 'phone' && phoneNumber === '9999999999');
    
    const userData: User = {
      id: 'user_123',
      name: isAdminLogin ? 'Admin User' : 'John Doe',
      email: loginMethod === 'email' ? email : (isAdminLogin ? 'admin@nearzy.com' : 'john@example.com'),
      phone: loginMethod === 'phone' ? phoneNumber : (isAdminLogin ? '9999999999' : '9876543210'),
      role: isAdminLogin ? 'admin' : 'customer'
    };

    setIsLoading(false);
    onLogin(userData);
  };

  const formatPhoneNumber = (value: string) => {
    return value.replace(/[^0-9]/g, '').substring(0, 10);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {showOtpInput ? 'Verify OTP' : 'Login to Nearzy'}
        </h1>
        <p className="text-gray-600">
          {showOtpInput 
            ? `Enter the OTP sent to your ${loginMethod}`
            : 'Get fast delivery from local stores'
          }
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {!showOtpInput ? (
          <>
            {/* Login Method Selection */}
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-colors ${
                  loginMethod === 'phone'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Phone size={20} />
                <span>Phone</span>
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-colors ${
                  loginMethod === 'email'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Mail size={20} />
                <span>Email</span>
              </button>
            </div>

            {/* Phone Login */}
            {loginMethod === 'phone' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                      placeholder="9876543210"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Login */}
            {loginMethod === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleSendOtp}
              disabled={isLoading || (loginMethod === 'phone' ? phoneNumber.length !== 10 : !email)}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </>
        ) : (
          <>
            {/* OTP Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowOtpInput(false)}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Change {loginMethod === 'phone' ? 'phone number' : 'email address'}
                </button>
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify & Login</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={handleSendOtp}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Didn't receive OTP? Resend
              </button>
            </div>
          </>
        )}

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Demo Mode:</strong> Any 6-digit OTP will work for testing purposes.<br/>
            <strong>Admin Access:</strong> Use email "admin@nearzy.com" or phone "9999999999"
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;