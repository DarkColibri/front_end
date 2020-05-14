// require('dotenv').config()

const PRODUCTION = require('./old.production')
const DEVELOPMENT = require('./old.development')
const QA = require('./old.qa')
const { NODE_ENV } = process.env

let currentEnv = DEVELOPMENT

if (NODE_ENV === 'production') {
  currentEnv = PRODUCTION
} else if (NODE_ENV === 'qa') {
  currentEnv = QA
}

module.exports = currentEnv
