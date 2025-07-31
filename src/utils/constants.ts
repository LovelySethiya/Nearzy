import { Product, Store } from '../types';

export const ADMIN_ORDERS = [
  {
    id: 'order_001',
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210',
    items: [
      { name: 'Parle-G Biscuits', quantity: 2, price: 10 },
      { name: 'Amul Milk 500ml', quantity: 1, price: 30 }
    ],
    total: 50,
    status: 'accepted' as const,
    orderTime: '2024-01-15 14:30',
    address: '123 MG Road, Bangalore',
    riderId: 'rider_001'
  },
  {
    id: 'order_002',
    customerName: 'Jane Smith',
    customerPhone: '+91 87654 32109',
    items: [
      { name: 'Cadbury Dairy Milk', quantity: 3, price: 40 },
      { name: 'Lay\'s Classic', quantity: 2, price: 20 }
    ],
    total: 160,
    status: 'delivered' as const,
    orderTime: '2024-01-15 13:15',
    address: '456 Brigade Road, Bangalore',
    riderId: 'rider_002'
  }
];

export const ADMIN_RIDERS = [
  {
    id: 'rider_001',
    name: 'Rahul Kumar',
    phone: '+91 99887 76655',
    rating: 4.8,
    status: 'busy' as const,
    currentOrders: 2,
    totalDeliveries: 245,
    location: 'Koramangala'
  },
  {
    id: 'rider_002',
    name: 'Priya Sharma',
    phone: '+91 88776 65544',
    rating: 4.9,
    status: 'available' as const,
    currentOrders: 0,
    totalDeliveries: 189,
    location: 'Indiranagar'
  },
  {
    id: 'rider_003',
    name: 'Amit Singh',
    phone: '+91 77665 54433',
    rating: 4.6,
    status: 'offline' as const,
    currentOrders: 0,
    totalDeliveries: 156,
    location: 'Whitefield'
  }
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Parle-G Biscuits',
    brand: 'Parle-G',
    price: 10,
    image: 'https://images.pexels.com/photos/1493711/pexels-photo-1493711.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'snacks',
    eta: '15 mins',
    inStock: true
  },
  {
    id: '2',
    name: 'Kurkure Masala Munch',
    brand: 'Kurkure',
    price: 20,
    image: 'https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'snacks',
    eta: '15 mins',
    inStock: true
  },
  {
    id: '3',
    name: 'Fresh Milk 500ml',
    brand: 'Amul',
    price: 30,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'dairy',
    eta: '10 mins',
    inStock: true
  },
  {
    id: '4',
    name: 'Colgate Toothpaste',
    brand: 'Colgate',
    price: 90,
    image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'personal-care',
    eta: '20 mins',
    inStock: true
  },
  {
    id: '5',
    name: "Lay's Classic Salted",
    brand: "Lay's",
    price: 20,
    image: 'https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'snacks',
    eta: '15 mins',
    inStock: true
  },
  {
    id: '6',
    name: 'Cadbury Dairy Milk 45g',
    brand: 'Cadbury',
    price: 40,
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'snacks',
    eta: '15 mins',
    inStock: true
  },
  {
    id: '7',
    name: 'Aashirvaad Atta 5kg',
    brand: 'Aashirvaad',
    price: 240,
    image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'grocery',
    eta: '25 mins',
    inStock: true
  },
  {
    id: '8',
    name: 'Dettol Handwash 200ml',
    brand: 'Dettol',
    price: 80,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'personal-care',
    eta: '20 mins',
    inStock: true
  }
];

export const SAMPLE_STORES: Store[] = [
  {
    id: '1',
    name: 'Fresh Mart',
    eta: '12 mins',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Quick Shop',
    eta: '8 mins',
    image: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2
  },
  {
    id: '3',
    name: 'Express Store',
    eta: '15 mins',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7
  }
];

export const CATEGORIES = [
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', icon: '🥕', color: 'bg-green-100' },
  { id: 'snacks', name: 'Snacks & Packaged Foods', icon: '🍿', color: 'bg-orange-100' },
  { id: 'dairy', name: 'Dairy & Bakery', icon: '🥛', color: 'bg-blue-100' },
  { id: 'household', name: 'Household Essentials', icon: '🏠', color: 'bg-purple-100' },
  { id: 'beverages', name: 'Beverages', icon: '🥤', color: 'bg-red-100' },
  { id: 'personal-care', name: 'Personal Care', icon: '🧴', color: 'bg-pink-100' },
  { id: 'baby-care', name: 'Baby Care', icon: '👶', color: 'bg-yellow-100' },
  { id: 'instant', name: 'Instant Items', icon: '⚡', color: 'bg-gray-100' }
];