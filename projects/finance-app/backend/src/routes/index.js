const express = require('express');
const router = express.Router();

// Health routes
router.use('/health', require('./health-routes'));

// Conta routes
router.use('/conta', require('./conta-routes'));

// Movto Contas routes
router.use('/movto-contas', require('./movto-contas'));

// User routes
router.use('/user', require('./user-routes'));

// Root route
router.use('/', (req, res) => {
  res.json({
    message: 'API Finance App'
  });
});

module.exports = router;