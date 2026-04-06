import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h6>🥬 FreshMart</h6>
            <p>Your neighborhood smart grocery store. Fresh products, great prices, delivered with care.</p>
          </div>
          <div className="col-md-2 mb-3">
            <h6>Quick Links</h6>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/stores">Stores</Link>
          </div>
          <div className="col-md-3 mb-3">
            <h6>Categories</h6>
            <Link to="/products?category=Fruits+%26+Vegetables">Fruits & Vegetables</Link>
            <Link to="/products?category=Dairy">Dairy</Link>
            <Link to="/products?category=Bakery">Bakery</Link>
            <Link to="/products?category=Beverages">Beverages</Link>
          </div>
          <div className="col-md-3 mb-3">
            <h6>Contact</h6>
            <p>📍 Main Market, Waknaghat, HP</p>
            <p>📞 +91 98160-55001</p>
            <p>✉️ hello@freshmart.in</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 FreshMart. All rights reserved. Built with 💚</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
