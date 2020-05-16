const debug = require('debug')('src-ssr:routes:users')
const express = require('express')

const db = require('../db/models')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const Repository = require('../repositoy/base.repository')
const repository = new Repository(db, 'users')

const router = express.Router()

// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy

router
  .use(cors())
  .use(bodyParser.json())
  .use(compression())

// passport.use('local.createUser', new LocalStrategy({
//   passReqToCallback: true
//   // Una vez iniciado el LocalStrategy se ejecuta:
//   // }, (req, name, password, dcone) => {
// }, (req, done) => {
//   console.log('****** PASSPORT *****')
//   console.log(req.body)
// }))

router.get('/', (req, res) => {
  debug('GET ALL')
  repository.findAll()
    .then(result => {
      debug('[OK] ' + JSON.stringify(result))
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      res.json({ message: err })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  debug('GET ' + id)
  repository.findOne(id)
    .then(result => {
      debug('[OK] ' + JSON.stringify(result))
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

router.get('/:name/:password', (req, res) => {
  // const { id } = req.params
  // debug(req)
  debug(req.method + req.url + ' ' + JSON.stringify(req.params))
  repository.getUser(req.params)
    .then(result => {
      debug('[OK] ' + JSON.stringify(result[0]))
      res.json(result[0])
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

// CREATE USER
router.post('/', (req, res) => {
  const { body } = req
  // console.log(passport)
  debug('POST ' + JSON.stringify(body))
  // GUARDAMOS USUARIO
  repository.create(body)
    .then(result => {
      debug('[OK] ' + JSON.stringify(result))
      res.status(201).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

router.get('/profile', (req, res) => {
  res.send('Este es el PROFILE')
})

router.put('/:id', (req, res) => {
  const { body } = req
  const { id } = req.params
  debug('PUT ' + id + ' - ' + JSON.stringify(body))
  repository.update(id, body)
    .then(result => {
      debug('[OK] ' + JSON.stringify(result))
      res.status(201).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  debug('DELETE: ' + id)
  repository.delete(id)
    .then(result => {
      debug('[OK] ' + result)
      res.status(204).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

module.exports = router
