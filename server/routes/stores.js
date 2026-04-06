const express = require('express');
const router = express.Router();
const { getClient } = require('../config/redis');
const { success, error } = require('../utils/response');

// GET /api/stores - Get all stores
router.get('/', async (req, res) => {
  try {
    const client = getClient();
    const cached = await client.get('stores:all');

    if (cached) {
      return success(res, JSON.parse(cached), 'cache');
    }

    return error(res, 'No stores found', 404);
  } catch (err) {
    console.error('Error fetching stores:', err);
    return error(res, 'Failed to fetch stores');
  }
});

module.exports = router;
