const express = require('express');
const router = express.Router();
const { getClient } = require('../config/redis');
const { success, error } = require('../utils/response');

// GET /api/products - Get all products with optional filters
router.get('/', async (req, res) => {
  try {
    const client = getClient();
    const { category, search, sort, minPrice, maxPrice } = req.query;

    let products;
    let source = 'cache';

    // Check for search cache
    if (search && search.length >= 3) {
      const cacheKey = `search:${search.toLowerCase()}`;
      const cached = await client.get(cacheKey);
      
      if (cached) {
        products = JSON.parse(cached);
      } else {
        const allProducts = JSON.parse(await client.get('products:all'));
        products = allProducts.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
        );
        // Cache search results for 5 minutes
        await client.setEx(cacheKey, 300, JSON.stringify(products));
        source = 'api';
      }
    } else if (category) {
      const cacheKey = `products:category:${category.toLowerCase()}`;
      const cached = await client.get(cacheKey);
      
      if (cached) {
        products = JSON.parse(cached);
      } else {
        const allProducts = JSON.parse(await client.get('products:all'));
        products = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
        await client.setEx(cacheKey, 600, JSON.stringify(products));
        source = 'api';
      }
    } else {
      products = JSON.parse(await client.get('products:all'));
    }

    if (!products) {
      return error(res, 'No products found', 404);
    }

    // Price filtering
    if (minPrice !== undefined) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== undefined) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price_asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'name_asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'popularity':
          products.sort((a, b) => b.popularity - a.popularity);
          break;
      }
    }

    return success(res, products, source);
  } catch (err) {
    console.error('Error fetching products:', err);
    return error(res, 'Failed to fetch products');
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const client = getClient();
    const { id } = req.params;
    
    const cached = await client.get(`product:${id}`);
    
    if (cached) {
      // Increment view count
      await client.zIncrBy('leaderboard:views', 1, id);
      return success(res, JSON.parse(cached), 'cache');
    }

    // Fallback: search in all products
    const allProducts = JSON.parse(await client.get('products:all'));
    const product = allProducts.find(p => p.id === id);
    
    if (!product) {
      return error(res, 'Product not found', 404);
    }

    // Cache individual product
    await client.set(`product:${id}`, JSON.stringify(product));
    // Increment view count
    await client.zIncrBy('leaderboard:views', 1, id);
    
    return success(res, product, 'api');
  } catch (err) {
    console.error('Error fetching product:', err);
    return error(res, 'Failed to fetch product');
  }
});

module.exports = router;
