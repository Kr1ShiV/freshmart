import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OffersPage from './pages/OffersPage';
import CartPage from './pages/CartPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/stores" element={<StoreLocatorPage />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
