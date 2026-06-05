const express = require('express');
const router = express.Router();

// Health routes
router.use('/health', require('./health-routes'));

// Root route
router.use('/', (req, res) => {
  res.json({
    message: 'API Finance App'
  });
});

module.exports = router;