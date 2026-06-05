const express = require('express');
const router = express.Router();

const contaController = require('../controllers/conta-controller');

router.get('/', contaController.findAll);
router.post('/', contaController.create);

module.exports = router;    