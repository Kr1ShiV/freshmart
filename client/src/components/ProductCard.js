import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick} role="button" tabIndex={0}>
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="category-badge">{product.category}</span>
      </div>
      <div className="card-body">
        <h6 className="product-name">{product.name}</h6>
        <span className="product-unit">per {product.unit}</span>
        <div className="card-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <button className="btn-add-cart" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
