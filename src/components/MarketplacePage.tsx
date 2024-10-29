import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Filter, CreditCard, QrCode, Truck, Briefcase, Users, Heart, MessageCircle } from 'lucide-react';
import ProductList from './marketplace/ProductList';
import ProductForm from './marketplace/ProductForm';
import OrderManagement from './marketplace/OrderManagement';
import PaymentGateway from './marketplace/PaymentGateway';
import ProfessionalDirectory from './marketplace/ProfessionalDirectory';
import ContributionMatching from './marketplace/ContributionMatching';
import CommunityNetworking from './marketplace/CommunityNetworking';
import { Product, Order } from '../types/marketplace';

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'directory' | 'contribute' | 'community' | 'sell' | 'orders'>('browse');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // This is a placeholder for the actual data fetching logic
    // Fetch products and orders from API or local storage
    const fetchData = async () => {
      // Simulating API call
      const mockProducts: Product[] = [
        { id: '1', name: 'Handmade Diya', description: 'Beautiful handcrafted diya for Diwali', price: 199, category: 'home-decor', image: 'https://example.com/diya.jpg', seller: 'Craft Bazaar' },
        { id: '2', name: 'Vedic Book Set', description: 'Complete set of Vedic literature', price: 2999, category: 'books', image: 'https://example.com/vedic-books.jpg', seller: 'Sanskrit Bookstore' },
        // Add more mock products as needed
      ];
      setProducts(mockProducts);

      const mockOrders: Order[] = [
        { id: '101', productId: '1', buyerId: 'user1', sellerId: 'seller1', status: 'processing', createdAt: new Date().toISOString() },
        { id: '102', productId: '2', buyerId: 'user2', sellerId: 'seller2', status: 'shipped', createdAt: new Date().toISOString() },
        // Add more mock orders as needed
      ];
      setOrders(mockOrders);
    };

    fetchData();
  }, []);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    setProducts([...products, productWithId]);
  };

  const handleBuyProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (paymentMethod: 'card' | 'qr') => {
    if (selectedProduct) {
      const newOrder: Order = {
        id: Date.now().toString(),
        productId: selectedProduct.id,
        buyerId: 'currentUserId', // Replace with actual user ID
        sellerId: selectedProduct.seller,
        status: 'processing',
        createdAt: new Date().toISOString(),
        paymentMethod: paymentMethod
      };
      setOrders([...orders, newOrder]);
      setShowPaymentModal(false);
      setSelectedProduct(null);
      // Here you would typically call an API to create the order
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || product.category === selectedCategory)
  );

  const TabButton: React.FC<{ icon: React.ElementType; label: string; active: boolean; onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-md mr-2 ${
        active ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800 hover:bg-saffron-200'
      }`}
    >
      <Icon size={20} className="mr-2" />
      {label}
    </button>
  );

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Marketplace</h1>
      
      <div className="flex mb-4 overflow-x-auto">
        <TabButton icon={ShoppingBag} label="Browse Products" active={activeTab === 'browse'} onClick={() => setActiveTab('browse')} />
        <TabButton icon={Briefcase} label="Professional Directory" active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} />
        <TabButton icon={Heart} label="Contribute & Match" active={activeTab === 'contribute'} onClick={() => setActiveTab('contribute')} />
        <TabButton icon={MessageCircle} label="Community" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
        <TabButton icon={CreditCard} label="Sell a Product" active={activeTab === 'sell'} onClick={() => setActiveTab('sell')} />
        <TabButton icon={Truck} label="Manage Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
      </div>

      {activeTab === 'browse' && (
        <>
          <div className="flex mb-4">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
              <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-md bg-saffron-100 text-saffron-800 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            >
              <option value="all">All Categories</option>
              <option value="home-decor">Home Decor</option>
              <option value="books">Books</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <ProductList products={filteredProducts} onBuyProduct={handleBuyProduct} />
        </>
      )}

      {activeTab === 'directory' && <ProfessionalDirectory />}

      {activeTab === 'contribute' && <ContributionMatching />}

      {activeTab === 'community' && <CommunityNetworking />}

      {activeTab === 'sell' && (
        <ProductForm onAddProduct={handleAddProduct} />
      )}

      {activeTab === 'orders' && (
        <OrderManagement orders={orders} setOrders={setOrders} />
      )}

      {showPaymentModal && selectedProduct && (
        <PaymentGateway
          product={selectedProduct}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default MarketplacePage;