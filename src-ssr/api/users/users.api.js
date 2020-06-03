const debug = require('debug')('src-ssr:api:users:users.api')
const express = require('express')
const router = express.Router()
const crud = require('../crud')
const model = require('./model')

const { isLoggedIn } = require('../../lib/auth')
const api = 'users'

// ---------------------------------------------------------------------------------
// USER LOGUED
router.get('/getUserLogin', (req, res) => {
  // debug('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  // debug(model.name)
  if (isLoggedIn(req, res)) {
    // debug(req.user)
    res.send(req.user)
  } else {
    // debug('Usuario no logeado.')
    res.status(401).send()
    // res.send()
  }
})

// ----------------------------------------------------------------------------------
// CRUD ROUTES
const resourceRoute = require('../../components/resource-route')
router.use('/', resourceRoute(api, crud))

// ----------------------------------------------------------------------------------
module.exports = router
