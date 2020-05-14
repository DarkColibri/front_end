// --------------------------------------------------------------------------------------------------------
//  LOGUIN
//
//  Aquí tenemos todo lo relacionado con el logueo:
//
//  RUTAS:  http://localhost:3333/auth/local/
//          http://localhost:3333/auth/logout/
// --------------------------------------------------------------------------------------------------------
const debug = require('debug')('src-ssr:auth:index')

const express = require('express')
//  AUTENTICACIÓN
debug('Cargamos LocalStrategy')
const LocalStrategy = require('./local/passport')

// CRUD LOGUEO
debug('CRUD Logueo: Modelo Usuario.')
const User = require('../api/user/model')

debug('Cargamos ruta logueo.')
const local = require('./local')

const router = express.Router()

debug('Asignamos el modelo a la base de datos.')
LocalStrategy.setup(User)

// //  GET Localhost:3333/auth/local
router.use('/local', local, (req, res) => {
  debug('[LOGIN]')
  debug(req)
})

//  GET Localhost:3333/auth/logout
router.use('/logout', (req, res) => {
  console.log('[LOGOUT]')
  req.logout()
  res.redirect('/')
})

// --------------------------------------------------------------------------------------------------------
module.exports = router
