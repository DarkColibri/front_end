const debug = require('debug')('src-ssr:api_authentication:routes:index')

const express = require('express')
const router = express.Router()

const { renderIndex } = require('../controllers/index.conroller')

router.get('/', renderIndex)

module.exports = router
