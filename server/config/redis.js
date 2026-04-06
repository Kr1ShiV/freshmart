const { createClient } = require('redis');

let client;

async function connectRedis() {
  client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  client.on('error', (err) => console.error('Redis Client Error:', err));
  client.on('connect', () => console.log('📡 Redis connecting...'));
  client.on('ready', () => console.log('✅ Redis ready'));

  await client.connect();
  return client;
}

function getClient() {
  if (!client) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  return client;
}

module.exports = { connectRedis, getClient };
