import React from 'react';

function SkeletonCard({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="col" key={i}>
          <div className="skeleton skeleton-card">
            <div className="skeleton-image skeleton"></div>
            <div style={{ padding: '1rem' }}>
              <div className="skeleton skeleton-text" style={{ height: '14px', marginBottom: '8px' }}></div>
              <div className="skeleton skeleton-text short" style={{ height: '12px', marginBottom: '12px' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '60px', height: '20px' }}></div>
                <div className="skeleton" style={{ width: '70px', height: '32px', borderRadius: '50px' }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;
