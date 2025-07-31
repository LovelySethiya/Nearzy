import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  Truck, 
  TrendingUp, 
  Clock,
  DollarSign,
  ShoppingBag,
  Star,
  MapPin,
  Phone,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { Page, AdminStats } from '../types';
import { ADMIN_ORDERS, ADMIN_RIDERS, SAMPLE_PRODUCTS } from '../utils/constants';

interface AdminDashboardProps {
  onPageChange: (page: Page) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onPageChange }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'riders' | 'analytics'>('overview');

  const stats: AdminStats = {
    totalOrders: 1247,
    activeOrders: 23,
    totalRevenue: 89650,
    totalCustomers: 2341,
    totalRiders: 45,
    averageDeliveryTime: '18 mins'
  };

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
              <TrendingUp size={14} className="mr-1" />
              {change > 0 ? '+' : ''}{change}% from last week
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ADMIN_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.map((item, idx) => (
                        <div key={idx}>{item.name} x{item.quantity}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProductsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SAMPLE_PRODUCTS.slice(0, 8).map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm">
                  Edit
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RidersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Rider Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus size={16} />
          <span>Add Rider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADMIN_RIDERS.map((rider) => (
          <div key={rider.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-green-600">{rider.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{rider.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone size={12} className="mr-1" />
                  {rider.phone}
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                rider.status === 'available' ? 'bg-green-100 text-green-800' :
                rider.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {rider.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{rider.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Current Orders</span>
                <span className="font-medium">{rider.currentOrders}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Deliveries</span>
                <span className="font-medium">{rider.totalDeliveries}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Location</span>
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1 text-gray-400" />
                  <span className="font-medium">{rider.location}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 text-sm">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Trends</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Order trends chart would go here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Revenue analytics chart would go here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-gray-600">Order Success Rate</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">18m</div>
            <div className="text-sm text-gray-600">Avg Delivery Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-600">Customer Retention</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersTab />;
      case 'products':
        return <ProductsTab />;
      case 'riders':
        return <RidersTab />;
      case 'analytics':
        return <AnalyticsTab />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Orders"
                value={stats.totalOrders.toLocaleString()}
                icon={ShoppingBag}
                color="bg-blue-500"
                change={12}
              />
              <StatCard
                title="Active Orders"
                value={stats.activeOrders}
                icon={Package}
                color="bg-orange-500"
                change={-5}
              />
              <StatCard
                title="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                color="bg-green-500"
                change={18}
              />
              <StatCard
                title="Total Customers"
                value={stats.totalCustomers.toLocaleString()}
                icon={Users}
                color="bg-purple-500"
                change={8}
              />
              <StatCard
                title="Active Riders"
                value={stats.totalRiders}
                icon={Truck}
                color="bg-indigo-500"
                change={3}
              />
              <StatCard
                title="Avg Delivery Time"
                value={stats.averageDeliveryTime}
                icon={Clock}
                color="bg-pink-500"
                change={-2}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {ADMIN_ORDERS.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.customerName}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">₹{order.total}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Top Performing Riders</h3>
                <div className="space-y-3">
                  {ADMIN_RIDERS.slice(0, 5).map((rider) => (
                    <div key={rider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-green-600">{rider.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{rider.name}</div>
                          <div className="text-sm text-gray-500">{rider.totalDeliveries} deliveries</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-500 fill-current mr-1" />
                        <span className="font-medium">{rider.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onPageChange('home')}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Nearzy Admin</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button
                onClick={() => onPageChange('home')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Back to Store
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'products', label: 'Products', icon: ShoppingBag },
            { id: 'riders', label: 'Riders', icon: Truck },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;