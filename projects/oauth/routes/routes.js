const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const userController = require('../controllers/userController')
const { signupRules, validateSignup } = require('../middleware/validateSignup')
const { loginRules, validateLogin } = require('../middleware/validateLogin')
const isAuthenticated = require('../middleware/isAuthenticated')
const passport = require('passport')

router.use(passport.initialize())
router.use(passport.session())
require('../passport-config')

router.get('/', controller.showIndex)
router.get('/signup', controller.showPageSignUp)
router.post('/signup', signupRules, validateSignup, userController.create_account)
router.post('/login', loginRules, validateLogin, userController.login)
router.get('/members', isAuthenticated, controller.showMembersPage)
router.post('/logout', isAuthenticated, userController.logout)
router.get('/health', controller.healthNode)
router.get('/health/mongo', controller.healthMongo)


// OAuth Github
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {    
    res.redirect('/members'); // Successful authentication, redirect to members page.
  });
router.use(controller.get404Page)


router.use(controller.get404Page)

module.exports = router
