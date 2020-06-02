const debug = require('debug')('src-ssr:api_authentication:router:auth.routes')

const express = require('express')
const router = express.Router()

const { signUp, signIn, logout } = require('../controllers/auth.controller')

// LOGIN: Realiza el logeo
router.post('/signin', signIn)

// SIGNUP: Realiza la alta de usuario.
router.post('/signup', signUp)

// LOGOUT
router.get('/logout', logout, (req, res) => {
  debug('Logout.......  [OK].')
})

module.exports = router
