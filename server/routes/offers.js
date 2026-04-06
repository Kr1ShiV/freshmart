const express = require('express');
const router = express.Router();
const { getClient } = require('../config/redis');
const { success, error } = require('../utils/response');

// GET /api/offers - Get all offers
router.get('/', async (req, res) => {
  try {
    const client = getClient();
    const cached = await client.get('offers:all');

    if (cached) {
      return success(res, JSON.parse(cached), 'cache');
    }

    return error(res, 'No offers found', 404);
  } catch (err) {
    console.error('Error fetching offers:', err);
    return error(res, 'Failed to fetch offers');
  }
});

// GET /api/offers/banners - Get banner data
router.get('/banners', async (req, res) => {
  try {
    const client = getClient();
    const cached = await client.get('offers:banners');

    if (cached) {
      return success(res, JSON.parse(cached), 'cache');
    }

    return error(res, 'No banners found', 404);
  } catch (err) {
    console.error('Error fetching banners:', err);
    return error(res, 'Failed to fetch banners');
  }
});

module.exports = router;
