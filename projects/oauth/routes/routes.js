const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const userController = require('../controllers/userController')

router.get('/', controller.showIndex)
router.get('/signup', controller.showPageSignUp)
router.post('/signup', userController.create_account)
router.get('/members', controller.showMembersPage)
router.use(controller.get404Page)

module.exports = router
