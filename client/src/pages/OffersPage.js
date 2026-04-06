import React, { useState, useEffect } from 'react';
import OfferCard from '../components/OfferCard';
import SkeletonCard from '../components/SkeletonCard';
import { getOffers } from '../services/api';

function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await getOffers();
        setOffers(res.data || []);
      } catch (err) {
        console.error('Error loading offers:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  return (
    <div style={{ paddingTop: '76px' }}>
      <div className="page-hero">
        <div className="container">
          <h1>🏷️ Special Offers</h1>
          <p>Grab these amazing deals before they expire!</p>
        </div>
      </div>

      <div className="container">
        {/* Promo Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,127,23,0.15) 0%, rgba(255,179,0,0.05) 100%)',
          border: '1px solid rgba(245,127,23,0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔥 Flash Sale is Live!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>Up to 40% off on fresh products. Limited time only!</p>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {loading ? (
            <SkeletonCard count={6} />
          ) : offers.length > 0 ? (
            offers.map(offer => (
              <div className="col" key={offer.id}>
                <OfferCard offer={offer} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="empty-state">
                <div className="empty-icon">🏷️</div>
                <h4>No Offers Available</h4>
                <p>Check back soon for exciting deals!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OffersPage;
