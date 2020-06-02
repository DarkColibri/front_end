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
  if (isLoggedIn(req, res)) {
    // debug(req.user)
    res.send(req.user)
  } else {
    // debug('Usuario no logeado.')
    res.status(401).send()
    // res.send()
  }
})

// ---------------------------------------------------------------------------------
// OTHER ROUTES
// CATEGORIÍAS de una asociacion
router.get('/online/:id', async (req, res) => {
  const { id } = req.params
  debug('ONLINE !!')
  const data = await model.findOne({ where: { id: id } })
  // debug(user)
  // const data = await model.updateAttributes({
  //   locale: req.body.name,
  //   where: { id: id }
  // })
  // debug(data)
  res.send({ data })
})
// ----------------------------------------------------------------------------------
// CRUD ROUTES
const resourceRoute = require('../../components/resource-route')
router.use('/', resourceRoute(api, crud))

// ----------------------------------------------------------------------------------
module.exports = router
