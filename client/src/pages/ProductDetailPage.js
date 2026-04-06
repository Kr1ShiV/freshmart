import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '76px' }}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }}></div>
            </div>
            <div className="col-md-6">
              <div className="skeleton skeleton-text" style={{ height: '20px', width: '30%', marginBottom: '16px' }}></div>
              <div className="skeleton skeleton-text" style={{ height: '32px', width: '80%', marginBottom: '16px' }}></div>
              <div className="skeleton skeleton-text" style={{ height: '40px', width: '40%', marginBottom: '24px' }}></div>
              <div className="skeleton skeleton-text" style={{ height: '14px', width: '100%', marginBottom: '8px' }}></div>
              <div className="skeleton skeleton-text" style={{ height: '14px', width: '90%', marginBottom: '8px' }}></div>
              <div className="skeleton skeleton-text" style={{ height: '14px', width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ paddingTop: '76px' }}>
        <div className="container mt-5">
          <div className="empty-state">
            <div className="empty-icon">😕</div>
            <h4>{error || 'Product not found'}</h4>
            <Link to="/products" className="btn-primary-custom mt-3" style={{ textDecoration: 'none' }}>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '76px' }}>
      <div className="container mt-4">
        <nav style={{ marginBottom: '1.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>/</span>
          <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Products</Link>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--primary-light)', fontSize: '0.85rem' }}>{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="detail-image">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-body">
                <span className="detail-category">{product.category}</span>
                <h1 className="detail-name">{product.name}</h1>
                <div className="detail-price">₹{product.price.toFixed(2)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {product.unit}</span></div>
                
                <p className="detail-description">{product.description}</p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(46, 125, 50, 0.1)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Popularity</span>
                    <br />
                    <strong style={{ color: 'var(--primary-light)' }}>{product.popularity}%</strong>
                  </div>
                  <div style={{
                    background: 'rgba(46, 125, 50, 0.1)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status</span>
                    <br />
                    <strong style={{ color: product.inStock ? 'var(--primary-light)' : '#ef5350' }}>
                      {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="qty-controls">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(99, q + 1))}>+</button>
                  </div>
                  <button className="btn-add-cart" onClick={handleAddToCart} style={{ padding: '0.6rem 2rem', fontSize: '0.95rem' }}>
                    🛒 Add to Cart — ₹{(product.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
