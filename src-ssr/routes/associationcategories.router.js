// const debug = require('debug')('src-ssr:routes:associations')
// const express = require('express')

// const db = require('../db/models')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const compression = require('compression')

// const Repository = require('../repositoy/base.repository')
// const repository = new Repository(db, 'associationcategories')

// const router = express.Router()

// router
//   .use(cors())
//   .use(bodyParser.json())
//   .use(compression())

// router.get('/', (req, res) => {
//   debug('GET ALL')
//   repository.findAll()
//     .then(result => {
//       debug(JSON.stringify(result))
//       res.json(result)
//     })
//     .catch(err => {
//       res.json({ message: err })
//     })
// })

// router.get('/:id', (req, res) => {
//   debug('GET /' + req.params)
//   const { id } = req.params
//   repository.findOne(id)
//     .then(result => {
//       // debug(JSON.stringify(result))
//       res.json(result)
//     })
//     .catch(err => {
//       res.status(404).json({ message: err })
//     })
// })

// // CATEGORIÍAS de una asociacion
// router.get('/category/:associationId', (req, res) => {
//   // const { id } = req.params
//   // debug(req)
//   // debug(req.method + req.url + ' ' + JSON.stringify(req.params))
//   repository.getCategoriesFromAssociation(req.params)
//     .then(result => {
//       // debug('[OK] ' + JSON.stringify(result[0]))
//       res.json(result)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(404).json({ message: err })
//     })
// })

// // ASOCIACIONES a de una categoria
// router.get('/associations/:categoryId', (req, res) => {
//   // const { id } = req.params
//   // debug(req)
//   // debug(req.method + req.url + ' ' + JSON.stringify(req.params))
//   repository.getAssociationsFromCategory(req.params)
//     .then(result => {
//       // debug('[OK] ' + JSON.stringify(result[0]))
//       res.json(result[0])
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(404).json({ message: err })
//     })
// })

// // CREATE
// router.post('/', (req, res) => {
//   const { body } = req
//   debug('POST ' + JSON.stringify(body))
//   repository.create(body)
//     .then(result => {
//       debug('POST Request ... [OK]: ' + JSON.stringify(result))
//       res.status(201).json(result)
//     })
//     .catch(err => {
//       debug('Error POST: ' + err)
//       res.status(404).json({ message: err })
//     })
// })

// // UPDATE
// router.put('/:id', (req, res) => {
//   const { body } = req
//   const { id } = req.params
//   debug('BODY ' + JSON.stringify(id, body))
//   repository.update(id, body)
//     .then(result => {
//       // debug('RESULT: ' + JSON.stringify(result))
//       res.status(201).json(result)
//       // res.json(result)
//     })
//     .catch(err => {
//       res.status(404).json({ message: err })
//     })
// })

// // DELETE
// router.delete('/:id', (req, res) => {
//   const { id } = req.params
//   // debug('DELETE: ' + id)
//   repository.delete(id)
//     .then(result => {
//       // debug('DELETE Request ... [OK]: ' + JSON.stringify(result))
//       res.status(204).json(result)
//     })
//     .catch(err => {
//       res.status(404).json({ message: err })
//     })
// })

// module.exports = router
