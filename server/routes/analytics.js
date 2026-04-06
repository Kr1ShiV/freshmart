const express = require('express');
const router = express.Router();
const { getClient } = require('../config/redis');
const { success, error } = require('../utils/response');

// GET /api/analytics/categories - Category distribution
router.get('/categories', async (req, res) => {
  try {
    const client = getClient();
    const allProducts = JSON.parse(await client.get('products:all'));

    if (!allProducts) {
      return error(res, 'No product data available', 404);
    }

    const categoryCount = {};
    allProducts.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    const data = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / allProducts.length) * 100)
    }));

    return success(res, data, 'api');
  } catch (err) {
    console.error('Error fetching category analytics:', err);
    return error(res, 'Failed to fetch category analytics');
  }
});

// GET /api/analytics/top-viewed - Top viewed products
router.get('/top-viewed', async (req, res) => {
  try {
    const client = getClient();
    const limit = parseInt(req.query.limit) || 10;

    // Get top viewed from sorted set (highest scores first)
    const topViewed = await client.zRangeWithScores('leaderboard:views', 0, limit - 1, { REV: true });

    if (!topViewed || topViewed.length === 0) {
      return error(res, 'No view data available', 404);
    }

    // Enrich with product names
    const enriched = await Promise.all(
      topViewed.map(async (item) => {
        const product = JSON.parse(await client.get(`product:${item.value}`));
        return {
          productId: item.value,
          name: product ? product.name : 'Unknown Product',
          category: product ? product.category : 'Unknown',
          views: item.score
        };
      })
    );

    return success(res, enriched, 'api');
  } catch (err) {
    console.error('Error fetching top viewed:', err);
    return error(res, 'Failed to fetch top viewed products');
  }
});

// GET /api/analytics/price-distribution - Price range distribution
router.get('/price-distribution', async (req, res) => {
  try {
    const client = getClient();
    const allProducts = JSON.parse(await client.get('products:all'));

    if (!allProducts) {
      return error(res, 'No product data available', 404);
    }

    const ranges = [
      { label: '₹0-₹50', min: 0, max: 50 },
      { label: '₹50-₹100', min: 50, max: 100 },
      { label: '₹100-₹200', min: 100, max: 200 },
      { label: '₹200-₹400', min: 200, max: 400 },
      { label: '₹400+', min: 400, max: Infinity }
    ];

    const distribution = ranges.map(range => ({
      range: range.label,
      count: allProducts.filter(p => p.price >= range.min && p.price < range.max).length
    }));

    return success(res, distribution, 'api');
  } catch (err) {
    console.error('Error fetching price distribution:', err);
    return error(res, 'Failed to fetch price distribution');
  }
});

module.exports = router;
