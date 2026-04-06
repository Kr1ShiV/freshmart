import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function OfferCard({ offer }) {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(offer.expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(offer.expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [offer.expiryDate]);

  function getTimeLeft(expiryDate) {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false
    };
  }

  const handleAddToCart = () => {
    addToCart({
      id: offer.productId,
      name: offer.name,
      price: offer.salePrice,
      image: offer.image,
      unit: 'each'
    });
  };

  return (
    <div className="offer-card">
      <div className="offer-img-wrapper">
        <img src={offer.image} alt={offer.name} loading="lazy" />
        <span className="discount-badge">-{offer.discount}%</span>
      </div>
      <div className="offer-body">
        <h6 className="offer-name">{offer.name}</h6>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {offer.description}
        </p>
        <div className="offer-prices">
          <span className="original-price">₹{offer.originalPrice.toFixed(2)}</span>
          <span className="sale-price">₹{offer.salePrice.toFixed(2)}</span>
        </div>
        
        {!timeLeft.expired ? (
          <div className="countdown">
            <div className="countdown-item">
              <span className="num">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="num">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="label">Hrs</span>
            </div>
            <div className="countdown-item">
              <span className="num">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="label">Min</span>
            </div>
            <div className="countdown-item">
              <span className="num">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="label">Sec</span>
            </div>
          </div>
        ) : (
          <p style={{ color: '#ef5350', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.5rem' }}>
            Offer Expired
          </p>
        )}

        <button
          className="btn-add-cart mt-3 w-100 justify-content-center"
          onClick={handleAddToCart}
          disabled={timeLeft.expired}
          style={{ opacity: timeLeft.expired ? 0.5 : 1 }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default OfferCard;
