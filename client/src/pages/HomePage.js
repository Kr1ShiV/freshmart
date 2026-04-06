import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { getProducts, getBanners } from '../services/api';

const CATEGORIES = [
  { name: 'Fruits & Vegetables', icon: '🥦', color: '#4CAF50' },
  { name: 'Dairy', icon: '🥛', color: '#42A5F5' },
  { name: 'Bakery', icon: '🍞', color: '#FF8F00' },
  { name: 'Beverages', icon: '🧃', color: '#AB47BC' },
  { name: 'Snacks', icon: '🍿', color: '#EF5350' },
  { name: 'Household', icon: '🧹', color: '#26A69A' },
];

function HomePage() {
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bannersRes, productsRes] = await Promise.all([
          getBanners(),
          getProducts({ sort: 'popularity' })
        ]);
        setBanners(bannersRes.data || []);
        setFeaturedProducts((productsRes.data || []).slice(0, 8));
      } catch (err) {
        console.error('Error loading home page:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: '76px' }}>
      {/* Banner */}
      <div className="container mt-4">
        {loading ? (
          <div className="skeleton" style={{ height: '380px', borderRadius: 'var(--radius-lg)' }}></div>
        ) : (
          <BannerCarousel banners={banners} />
        )}
      </div>

      {/* Categories */}
      <div className="container my-5">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="row g-3">
          {CATEGORIES.map(cat => (
            <div className="col-6 col-md-4 col-lg-2" key={cat.name}>
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="category-card d-block"
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container my-5">
        <div className="section-header">
          <h2>Popular Products</h2>
          <Link to="/products?sort=popularity" className="view-all">View All →</Link>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {loading ? (
            <SkeletonCard count={8} />
          ) : (
            featuredProducts.map(product => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Promo Section */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div style={{
              background: 'linear-gradient(135deg, rgba(46,125,50,0.15) 0%, rgba(76,175,80,0.05) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚚</span>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Free Delivery</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                On all orders over ₹500. Fast and reliable delivery straight to your door.
              </p>
              <Link to="/products" className="btn-primary-custom" style={{ width: 'fit-content', textDecoration: 'none' }}>
                Shop Now
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{
              background: 'linear-gradient(135deg, rgba(245,127,23,0.15) 0%, rgba(255,179,0,0.05) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏷️</span>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Special Offers</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Save up to 40% on selected items. Limited time deals you don't want to miss!
              </p>
              <Link to="/offers" className="btn-primary-custom" style={{
                width: 'fit-content', textDecoration: 'none',
                background: 'linear-gradient(135deg, #F57F17 0%, #FFB300 100%)'
              }}>
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
