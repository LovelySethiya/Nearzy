import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, Clock, MapPin, Phone, Star, ArrowLeft } from 'lucide-react';
import { Order, Page } from '../types';

interface TrackOrderPageProps {
  order: Order | null;
  onPageChange: (page: Page) => void;
}

const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ order, onPageChange }) => {
  const [currentStatus, setCurrentStatus] = useState<Order['status']>('accepted');
  const [estimatedTime, setEstimatedTime] = useState('15-20 mins');

  useEffect(() => {
    if (!order) return;

    // Simulate order status progression
    const statusProgression: Order['status'][] = ['accepted', 'packed', 'picked-up', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length - 1) {
        currentIndex++;
        setCurrentStatus(statusProgression[currentIndex]);
        
        // Update estimated time based on status
        switch (statusProgression[currentIndex]) {
          case 'packed':
            setEstimatedTime('10-15 mins');
            break;
          case 'picked-up':
            setEstimatedTime('5-8 mins');
            break;
          case 'delivered':
            setEstimatedTime('Delivered!');
            break;
        }
      } else {
        clearInterval(interval);
      }
    }, 5000); // Change status every 5 seconds for demo

    return () => clearInterval(interval);
  }, [order]);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No active orders</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
          <button
            onClick={() => onPageChange('home')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const statusSteps = [
    {
      id: 'accepted',
      name: 'Order Accepted',
      description: 'Your order has been confirmed',
      icon: CheckCircle,
      completed: ['accepted', 'packed', 'picked-up', 'delivered'].includes(currentStatus)
    },
    {
      id: 'packed',
      name: 'Packed',
      description: 'Your items are being packed',
      icon: Package,
      completed: ['packed', 'picked-up', 'delivered'].includes(currentStatus)
    },
    {
      id: 'picked-up',
      name: 'Picked Up',
      description: 'Rider has picked up your order',
      icon: MapPin,
      completed: ['picked-up', 'delivered'].includes(currentStatus)
    },
    {
      id: 'delivered',
      name: 'Delivered',
      description: 'Order delivered successfully',
      icon: CheckCircle,
      completed: currentStatus === 'delivered'
    }
  ];

  const mockRider = {
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    rating: 4.8
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-gray-600">Order ID: {order.id}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Progress */}
        <div className="lg:col-span-2">
          {/* Status Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Order Status</h3>
              <div className="text-right">
                <div className="text-sm text-gray-600">Estimated delivery</div>
                <div className="font-semibold text-green-600">{estimatedTime}</div>
              </div>
            </div>

            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStatus === step.id;
                const isCompleted = step.completed;

                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-100 text-green-600' 
                        : isActive 
                        ? 'bg-blue-100 text-blue-600 animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-medium ${
                        isCompleted ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </div>
                      <div className={`text-sm ${
                        isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </div>
                      {isActive && (
                        <div className="text-xs text-blue-600 mt-1 font-medium">
                          In Progress...
                        </div>
                      )}
                    </div>

                    {index < statusSteps.length - 1 && (
                      <div className={`absolute left-9 mt-10 w-0.5 h-6 ${
                        isCompleted ? 'bg-green-200' : 'bg-gray-200'
                      }`} style={{ marginLeft: '1.25rem' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Delivery Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <div>
                  <div className="text-sm text-gray-600">Delivery Address</div>
                  <div className="font-medium text-gray-900">{order.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Rider Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Rider Information */}
          {(currentStatus === 'picked-up' || currentStatus === 'delivered') && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Delivery Partner</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-green-600">
                    {mockRider.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{mockRider.name}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star size={12} className="text-yellow-500 fill-current mr-1" />
                    {mockRider.rating}
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                <Phone size={16} />
                <span>Call Rider</span>
              </button>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
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
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Live Map Placeholder */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Live Tracking</h3>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Live map tracking</div>
                <div className="text-xs text-gray-500 mt-1">
                  {currentStatus === 'delivered' ? 'Order delivered!' : 'Rider en route'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;