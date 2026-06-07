const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.post('/', userController.create);
router.get('/:id', userController.findOneByUsername);
router.delete('/:id', userController.deleteAt);

module.exports = router;    