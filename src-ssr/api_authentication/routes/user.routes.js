const debug = require('debug')('src-ssr:api_authentication:routes:user')
const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../lib/auth')
const { renderUserProfile } = require('../controllers/user.controller')

const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

router
  .use(cors())
  .use(bodyParser.json())
  .use(compression())

// router.get('/profile', isLoggedIn, renderUserProfile, (req) => {
//   debug('PROFILE...')
//   debug(req.user)
//   // debug('SESSION ID:' + req.sessionID)
//   // debug(req.session)
// })

router.get('/getUserLogin', isLoggedIn, (req, res) => {
  debug('Get User Login...')
  debug(req.user)
  debug('[ 9999 ] ======================================')
  if (req.user != null) {
    debug('Enviamos user')
    res.json(req.user)
  }
  res.send(null)
  // debug('SESSION ID:' + req.sessionID)
  // debug(req.session)
})

module.exports = router
