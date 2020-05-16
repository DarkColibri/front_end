const debug = require('debug')('src-ssr:api_authentication:routes:user')
const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../lib/auth')
const { renderUserProfile } = require('../controllers/user.controller')

router.get('/profile', isLoggedIn, renderUserProfile, (req) => {
  debug('PROFILE...')
  debug(req.user)
  // debug('SESSION ID:' + req.sessionID)
  // debug(req.session)
})

module.exports = router
