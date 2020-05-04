const debug = require('debug')('web:src-ssr:routes:users')
const express = require('express')

const db = require('../../db/models')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const Repository = require('../repositoy/base.repository')
const repository = new Repository(db, 'users')

const router = express.Router()

router
  .use(cors())
  .use(bodyParser.json())
  .use(compression())

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

router.post('/', (req, res) => {
  const { body } = req
  debug('POST ' + JSON.stringify(body))
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
