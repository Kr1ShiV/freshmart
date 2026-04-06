import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { getProducts } from '../services/api';

const CATEGORIES = [
  'Fruits & Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Household'
];

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');
  const [maxPrice, setMaxPrice] = useState(700);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm && searchTerm.length >= 3) params.search = searchTerm;
      if (sortBy) params.sort = sortBy;
      if (maxPrice < 700) params.maxPrice = maxPrice;

      const res = await getProducts(params);
      setProducts(res.data || []);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, sortBy, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Sync URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchTerm(search);
    if (sort) setSortBy(sort);
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    const newCat = selectedCategory === category ? '' : category;
    setSelectedCategory(newCat);
    const newParams = new URLSearchParams(searchParams);
    if (newCat) {
      newParams.set('category', newCat);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    const newParams = new URLSearchParams(searchParams);
    if (sort) {
      newParams.set('sort', sort);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setSortBy('');
    setMaxPrice(700);
    setSearchParams({});
  };

  return (
    <div style={{ paddingTop: '76px' }}>
      <div className="page-hero">
        <div className="container">
          <h1>🛍️ Our Products</h1>
          <p>Browse our wide selection of fresh, quality groceries</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="filters-sidebar">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Filters</h5>
                <button className="btn-outline-custom" style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }} onClick={clearFilters}>
                  Clear All
                </button>
              </div>

              {/* Search in filters */}
              <div className="filter-group">
                <label>Search</label>
                <input
                  type="text"
                  className="sort-select"
                  placeholder="Type 3+ characters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="filter-group">
                <label>Categories</label>
                {CATEGORIES.map(cat => (
                  <div className="form-check" key={cat}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`cat-${cat}`}
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <label className="form-check-label" htmlFor={`cat-${cat}`}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label>Max Price: ₹{maxPrice}</label>
                <input
                  type="range"
                  className="price-range-slider"
                  min="10"
                  max="700"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                />
                <div className="d-flex justify-content-between" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>₹10</span>
                  <span>₹700</span>
                </div>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <label>Sort By</label>
                <select className="sort-select" value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {!loading && (
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 0 }}>
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  {selectedCategory && <span> in <strong style={{ color: 'var(--primary-light)' }}>{selectedCategory}</strong></span>}
                  {searchTerm && <span> for "<strong style={{ color: 'var(--primary-light)' }}>{searchTerm}</strong>"</span>}
                </p>
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239, 83, 80, 0.1)',
                border: '1px solid rgba(239, 83, 80, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                color: '#ef5350',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {loading ? (
                <SkeletonCard count={9} />
              ) : products.length > 0 ? (
                products.map(product => (
                  <div className="col" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h4>No Products Found</h4>
                    <p>Try adjusting your filters or search term</p>
                    <button className="btn-primary-custom mt-3" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
