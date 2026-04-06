import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function BannerCarousel({ banners }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [banners, nextSlide]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="banner-carousel">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={banner.image} alt={banner.title} />
          <div className="banner-overlay">
            <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p>
            <Link to={banner.link} className="btn-shop">
              Shop Now →
            </Link>
          </div>
        </div>
      ))}
      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerCarousel;
