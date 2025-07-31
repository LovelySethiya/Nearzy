import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Page, CartItem, Product, Order } from './types';
import { SAMPLE_PRODUCTS } from './utils/constants';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isShopkeeper, setIsShopkeeper] = useState(false);

  // Calculate total cart items
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle quantity changes in cart
  const handleQuantityChange = (productId: string, quantity: number) => {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === productId);
      
      if (quantity === 0) {
        // Remove item from cart
        return prevCart.filter(item => item.id !== productId);
      }
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = { ...product, quantity };
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Get quantity for a specific product
  const getProductQuantity = (productId: string): number => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Handle page navigation
  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage('products');
  };

  // Update admin and shopkeeper status when user changes
  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.role === 'admin');
      setIsShopkeeper(currentUser.role === 'shopkeeper');
    } else {
      setIsAdmin(false);
      setIsShopkeeper(false);
    }
  }, [currentUser]);

  // Handle order placement
  const handlePlaceOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
    };
    setCurrentOrder(newOrder);
    setCart([]); // Clear cart after order
    setCurrentPage('track-order');
  };

  // Handle payment completion
  const handlePaymentComplete = (address: string) => {
    const orderData = {
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'accepted' as const,
      eta: '15-20 mins',
      address,
    };
    handlePlaceOrder(orderData);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onCategorySelect={handleCategorySelect}
            onPageChange={handlePageChange}
          />
        );
      case 'categories':
        return (
          <CategoriesPage 
            onCategorySelect={handleCategorySelect}
          />
        );
      case 'products':
        return (
          <ProductsPage 
            selectedCategory={selectedCategory}
            onQuantityChange={handleQuantityChange}
            getProductQuantity={getProductQuantity}
          />
        );
      case 'cart':
        return (
          <CartPage 
            cart={cart}
            onQuantityChange={handleQuantityChange}
            onPageChange={handlePageChange}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            cart={cart}
            onPageChange={handlePageChange}
          />
        );
      case 'payment':
        return (
          <PaymentPage 
            cart={cart}
            onPaymentComplete={handlePaymentComplete}
            onPageChange={handlePageChange}
          />
        );
      case 'track-order':
        return (
          <TrackOrderPage 
            order={currentOrder}
            onPageChange={handlePageChange}
          />
        );
      case 'login':
        return (
          <LoginPage 
            onLogin={() => {}} // Firebase handles login automatically
            onPageChange={handlePageChange}
          />
        );
      case 'admin':
      case 'admin-orders':
      case 'admin-products':
      case 'admin-riders':
      case 'admin-analytics':
        return (
          <AdminDashboard 
            onPageChange={handlePageChange}
          />
        );
      case 'shopkeeper':
      case 'shopkeeper-orders':
      case 'shopkeeper-products':
      case 'shopkeeper-analytics':
        return (
          <ShopkeeperDashboard 
            onPageChange={handlePageChange}
          />
        );
      default:
        return (
          <HomePage 
            onCategorySelect={handleCategorySelect}
            onPageChange={handlePageChange}
          />
        );
    }
  };

  // Show loading spinner while Firebase initializes
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        cartItemsCount={cartItemsCount}
        isAdmin={isAdmin}
        isShopkeeper={isShopkeeper}
        currentUser={currentUser}
      />
      
      <main className="pb-20 md:pb-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;