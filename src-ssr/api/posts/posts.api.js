const express = require('express')
const resourceRoute = require('../../components/resource-route')

const post = require('../crud')
const model = require('./model')

const router = express.Router()

// router.use('/users', resourceRoute('users', user))
router.use('/', resourceRoute('posts', post))

router.get('/threads/:id', async (req, res) => {
  const { id } = req.params
  const data = await model.findAll({ where: { threadId: id } })
  // console.log(data)
  res.send(data)
  // return { data }
})

module.exports = router
