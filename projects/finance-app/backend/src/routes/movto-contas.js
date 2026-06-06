const express = require('express');
const router = express.Router();

const movtoContasController = require('../controllers/movto-contas-controller');

router.get('/', movtoContasController.findAll);
router.post('/', movtoContasController.create);
router.put('/:id', movtoContasController.update);
router.delete('/:id', movtoContasController.deleteAt);

module.exports = router;    