const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { connectRedis } = require('./config/redis');
const productRoutes = require('./routes/products');
const offerRoutes = require('./routes/offers');
const storeRoutes = require('./routes/stores');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Smart Grocery Store API is running', timestamp: new Date().toISOString() });
});

// Serve React build
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server
async function startServer() {
  try {
    await connectRedis();
    console.log('✅ Redis connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📦 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🌐 App URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.log('⚠️  Make sure Redis is running on localhost:6379');
    process.exit(1);
  }
}

startServer();
