import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  'Fruits & Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Household'
];

function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const debounceRef = React.useRef(null);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      if (value.length >= 3) {
        navigate(`/products?search=${encodeURIComponent(value)}`);
      }
    }, 300);
  }, [navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length >= 3) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">🥬</span>
          FreshMart
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/" onClick={() => setIsCollapsed(true)}>Home</Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle btn btn-link ${isActive('/products')}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ textDecoration: 'none' }}
              >
                Products
              </button>
              <ul className="dropdown-menu" style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/products"
                    onClick={() => setIsCollapsed(true)}
                    style={{ color: 'var(--text-primary)' }}
                  >
                    All Products
                  </Link>
                </li>
                <li><hr className="dropdown-divider" style={{ borderColor: 'var(--border-color)' }} /></li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <Link
                      className="dropdown-item"
                      to={`/products?category=${encodeURIComponent(cat)}`}
                      onClick={() => setIsCollapsed(true)}
                      style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/offers')}`} to="/offers" onClick={() => setIsCollapsed(true)}>Offers</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/stores')}`} to="/stores" onClick={() => setIsCollapsed(true)}>Stores</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/analytics')}`} to="/analytics" onClick={() => setIsCollapsed(true)}>Analytics</Link>
            </li>
          </ul>

          <form className="nav-search me-3" onSubmit={handleSearchSubmit}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search products"
            />
          </form>

          <Link to="/cart" className="cart-btn" onClick={() => setIsCollapsed(true)}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
