const express = require('express');
const router = express.Router();

const contaController = require('../controllers/conta-controller');

router.post('/', contaController.create);

module.exports = router;    