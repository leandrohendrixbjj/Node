const express = require('express');
const router = express.Router();

const contaController = require('../controllers/conta-controller');

router.get('/', contaController.findAll);
router.post('/', contaController.create);
router.put('/:id', contaController.update);
router.delete('/:id', contaController.deleteAt);

module.exports = router;    