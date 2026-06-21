const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.post('/', userController.create);
router.get('/:id', userController.findOneById);
router.delete('/:id', userController.deleteAt);
router.put('/:id', userController.update);

module.exports = router;    