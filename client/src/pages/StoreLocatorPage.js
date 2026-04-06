import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStores } from '../services/api';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom green marker
const storeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Haversine distance calculation
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function FlyToLocation({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

function StoreLocatorPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapCenter, setMapCenter] = useState([30.9084, 77.0997]); // Default: Waknaghat, HP

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await getStores();
        setStores(res.data || []);
      } catch (err) {
        console.error('Error loading stores:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStores();

    // Request geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          setMapCenter(loc);
        },
        () => {
          console.log('Geolocation denied, using default Waknaghat');
        }
      );
    }
  }, []);

  const storesWithDistance = stores.map(store => ({
    ...store,
    distance: userLocation
      ? haversineDistance(userLocation[0], userLocation[1], store.lat, store.lng)
      : null
  })).sort((a, b) => (a.distance || 999) - (b.distance || 999));

  const getDirectionsUrl = (store) => {
    const origin = userLocation ? `${userLocation[0]},${userLocation[1]}` : '';
    return `https://www.google.com/maps/dir/${origin}/${store.lat},${store.lng}`;
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store.id);
    setMapCenter([store.lat, store.lng]);
  };

  return (
    <div style={{ paddingTop: '76px' }}>
      <div className="page-hero">
        <div className="container">
          <h1>📍 Store Locator</h1>
          <p>Find a FreshMart store near you</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Store List */}
          <div className="col-lg-4 mb-4">
            <div style={{ maxHeight: '530px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {userLocation && (
                <div style={{
                  background: 'rgba(46, 125, 50, 0.1)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.8rem',
                  marginBottom: '0.8rem',
                  fontSize: '0.8rem'
                }}>
                  📍 Your location detected · Distances shown below
                </div>
              )}

              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '120px', borderRadius: 'var(--radius-md)', marginBottom: '0.8rem' }}></div>
                ))
              ) : (
                storesWithDistance.map(store => (
                  <div
                    key={store.id}
                    className={`store-list-card ${selectedStore === store.id ? 'active' : ''}`}
                    onClick={() => handleStoreClick(store)}
                    style={selectedStore === store.id ? { borderColor: 'var(--primary)', background: 'var(--bg-card-hover)' } : {}}
                  >
                    <h6>{store.name}</h6>
                    <p>📍 {store.address}</p>
                    <p>📞 {store.phone}</p>
                    <p>🕐 {store.hours}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      {store.distance !== null && (
                        <span className="distance">📏 {store.distance.toFixed(1)} km away</span>
                      )}
                      <a
                        href={getDirectionsUrl(store)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-directions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🧭 Get Directions
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Map */}
          <div className="col-lg-8">
            <div className="map-container">
              <MapContainer
                center={mapCenter}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FlyToLocation center={mapCenter} />

                {userLocation && (
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>
                      <strong>📍 Your Location</strong>
                    </Popup>
                  </Marker>
                )}

                {storesWithDistance.map(store => (
                  <Marker
                    key={store.id}
                    position={[store.lat, store.lng]}
                    icon={storeIcon}
                  >
                    <Popup>
                      <div style={{ minWidth: '200px' }}>
                        <strong style={{ fontSize: '0.95rem' }}>{store.name}</strong>
                        <br />
                        <small>{store.address}</small>
                        <br />
                        <small>📞 {store.phone}</small>
                        <br />
                        <small>🕐 {store.hours}</small>
                        {store.distance !== null && (
                          <>
                            <br />
                            <small><strong>📏 {store.distance.toFixed(1)} km away</strong></small>
                          </>
                        )}
                        <br />
                        <a
                          href={getDirectionsUrl(store)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '0.8rem' }}
                        >
                          🧭 Get Directions
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreLocatorPage;
