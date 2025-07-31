import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { Page, ShopkeeperStats, ShopkeeperOrder, Product } from '../types';

interface ShopkeeperDashboardProps {
  onPageChange: (page: Page) => void;
}

const ShopkeeperDashboard: React.FC<ShopkeeperDashboardProps> = ({ onPageChange }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'analytics'>('overview');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'packed' | 'picked-up' | 'delivered'>('all');

  // Mock data for shopkeeper
  const shopkeeperStats: ShopkeeperStats = {
    totalOrders: 156,
    pendingOrders: 12,
    completedOrders: 144,
    totalRevenue: 45230,
    averageOrderValue: 290,
    topProducts: [
      { id: '1', name: 'Fresh Milk', brand: 'Dairy Farm', price: 45, image: '/milk.jpg', category: 'dairy', eta: '10 mins', inStock: true },
      { id: '2', name: 'Bread', brand: 'Bakery Fresh', price: 25, image: '/bread.jpg', category: 'bakery', eta: '5 mins', inStock: true },
      { id: '3', name: 'Eggs', brand: 'Farm Fresh', price: 60, image: '/eggs.jpg', category: 'dairy', eta: '8 mins', inStock: true }
    ]
  };

  const mockOrders: ShopkeeperOrder[] = [
    {
      id: 'order_001',
      items: [
        { id: '1', name: 'Fresh Milk', brand: 'Dairy Farm', price: 45, image: '/milk.jpg', category: 'dairy', eta: '10 mins', inStock: true, quantity: 2 },
        { id: '2', name: 'Bread', brand: 'Bakery Fresh', price: 25, image: '/bread.jpg', category: 'bakery', eta: '5 mins', inStock: true, quantity: 1 }
      ],
      total: 115,
      status: 'pending',
      eta: '15-20 mins',
      address: '123 Main St, City',
      customerName: 'John Doe',
      customerPhone: '+91 9876543210',
      orderTime: '2024-01-15 14:30',
      estimatedPickupTime: '14:45'
    },
    {
      id: 'order_002',
      items: [
        { id: '3', name: 'Eggs', brand: 'Farm Fresh', price: 60, image: '/eggs.jpg', category: 'dairy', eta: '8 mins', inStock: true, quantity: 1 }
      ],
      total: 60,
      status: 'packed',
      eta: '10-15 mins',
      address: '456 Oak Ave, City',
      customerName: 'Jane Smith',
      customerPhone: '+91 9876543211',
      orderTime: '2024-01-15 14:25',
      estimatedPickupTime: '14:40'
    }
  ];

  const mockProducts: Product[] = [
    { id: '1', name: 'Fresh Milk', brand: 'Dairy Farm', price: 45, image: '/milk.jpg', category: 'dairy', eta: '10 mins', inStock: true },
    { id: '2', name: 'Bread', brand: 'Bakery Fresh', price: 25, image: '/bread.jpg', category: 'bakery', eta: '5 mins', inStock: true },
    { id: '3', name: 'Eggs', brand: 'Farm Fresh', price: 60, image: '/eggs.jpg', category: 'dairy', eta: '8 mins', inStock: true },
    { id: '4', name: 'Butter', brand: 'Dairy Farm', price: 35, image: '/butter.jpg', category: 'dairy', eta: '5 mins', inStock: false }
  ];

  const filteredOrders = mockOrders.filter(order => 
    orderFilter === 'all' ? true : order.status === orderFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'packed': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'packed': return <Package size={16} />;
      case 'picked-up': return <Users size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopkeeper Dashboard</h1>
        <p className="text-gray-600">Manage your store orders, products, and analytics</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'products', label: 'Products', icon: Edit },
          { id: 'analytics', label: 'Analytics', icon: DollarSign }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{shopkeeperStats.totalOrders}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-yellow-600">{shopkeeperStats.pendingOrders}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{shopkeeperStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{shopkeeperStats.averageOrderValue}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customerName} • {order.customerPhone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{order.total}</p>
                      <p className="text-sm text-gray-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value as any)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="packed">Packed</option>
                  <option value="picked-up">Picked Up</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Orders ({filteredOrders.length})</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.orderTime}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{order.total}</p>
                        <p className="text-sm text-gray-600">ETA: {order.eta}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-medium">{order.customerName} ({order.customerPhone})</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium">{order.address}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pickup Time:</span>
                        <span className="font-medium">{order.estimatedPickupTime}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Items:</p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Eye size={16} className="inline mr-1" />
                        View Details
                      </button>
                      {order.status === 'pending' && (
                        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                          Mark Packed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Products</h3>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package size={24} className="text-gray-400" />
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ETA: {product.eta}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart placeholder</p>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-3">
                {shopkeeperStats.topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperDashboard; 