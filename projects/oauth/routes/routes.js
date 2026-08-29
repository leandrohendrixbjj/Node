const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const userController = require('../controllers/userController')
const { signupRules, validateSignup } = require('../middleware/validateSignup')

router.get('/', controller.showIndex)
router.get('/signup', controller.showPageSignUp)
router.post('/signup', signupRules, validateSignup, userController.create_account)
router.get('/members', controller.showMembersPage)
router.get('/health', controller.healthNode)
router.get('/health/mongo', controller.healthMongo)
router.use(controller.get404Page)

module.exports = router
