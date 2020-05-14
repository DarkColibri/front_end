const debug = require('debug')('src-ssr:api_authentication:router:auth.routes')

const express = require('express')
const router = express.Router()

const { renderSignUp, signUp, renderSignIn, signIn, logout } = require('../controllers/auth.controller')

// LOGIN: Realiza el logeo
router.post('/signin', signIn)

// SIGNUP: Realiza la alta de usuario.
router.post('/signup', signUp)

// B O R R A R

// SIGNUP: Muestra la pantalla de ALTA usuario
router.get('/signup', renderSignUp, (req, res) => {
  debug('Vew signup render.... [OK]')
  debug(req.user)
  debug('SESSION ID:' + req.sessionID)
  debug(req.session)
})

// LOGIN: Mostrar Pantalla
router.get('/signin', renderSignIn, (req, res) => {
  debug('Vew login render.... [OK]')
  debug(req.user)
  debug('SESSION ID:' + req.sessionID)
  debug(req.session)
})

router.get('/logout', logout, (req, res) => {
  debug('Logout.......  [OK].')
  debug(req.user)
  debug('SESSION ID:' + req.sessionID)
  debug(req.session)
})

module.exports = router
