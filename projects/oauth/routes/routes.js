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
require('../services/GitHubOauth')
require('../services/GoogleOauth')

router.get('/', controller.showIndex)
router.get('/signup', controller.showPageSignUp)
router.post('/signup', signupRules, validateSignup, userController.create_account)
router.post('/login', loginRules, validateLogin, userController.login)
router.get('/members', isAuthenticated, controller.showMembersPage)
router.post('/logout', isAuthenticated, userController.logout)
router.get('/health', controller.healthNode)
router.get('/health/mongo', controller.healthMongo)

/* GitHub OAuth */
/*
 1 - Redireciona o navegador para o GitHub, pedindo o escopo user:email.
 2 - O GitHub autentica a pessoa e devolve o navegador para GET /auth/github/callback com um código.
 3 - Passport.authenticate('github', ...) troca esse código por um access token, busca o perfil e chama a função da 
     strategy em passport-oauth-github-config.js
 4 - Se done(null, profile.id) não tiver erro, o Passport chama req.login internamente. Isso passa por serializeUser e grava o 
     id na sessão, em req.session.passport.user, no mesmo store Mongo do express-session.    
*/
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {        
    res.redirect('/members'); // Successful authentication, redirect to members page.
});

/* Google OAuth */
/*
 1 - Redireciona o navegador para o Google, pedindo o escopo profile e email.
 2 - O Google autentica a pessoa e devolve o navegador para GET /auth/google/callback com um código.
 3 - Passport.authenticate('google', ...) troca esse código por um access token, busca o perfil e chama a função da 
     strategy em GoogleOauth.js
 4 - Se done(null, profile.id) não tiver erro, o Passport chama req.login internamente. Isso passa por serializeUser e grava o 
     id na sessão, em req.session.passport.user, no mesmo store Mongo do express-session.    
*/
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/members');
  });

router.use(controller.get404Page)

module.exports = router
