export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  eta: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  eta: string;
  image: string;
  rating: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'accepted' | 'packed' | 'picked-up' | 'delivered';
  eta: string;
  address: string;
  rider?: {
    name: string;
    phone: string;
    rating: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: 'customer' | 'admin' | 'shopkeeper';
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  currentOrders: number;
  totalDeliveries: number;
  location: string;
}

export interface AdminStats {
  totalOrders: number;
  activeOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalRiders: number;
  averageDeliveryTime: string;
}

export interface ShopkeeperStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: Product[];
}

export interface ShopkeeperOrder extends Order {
  customerName: string;
  customerPhone: string;
  orderTime: string;
  estimatedPickupTime: string;
}

export type Page = 'home' | 'categories' | 'products' | 'cart' | 'checkout' | 'track-order' | 'login' | 'payment' | 'admin' | 'admin-orders' | 'admin-products' | 'admin-riders' | 'admin-analytics' | 'shopkeeper' | 'shopkeeper-orders' | 'shopkeeper-products' | 'shopkeeper-analytics';