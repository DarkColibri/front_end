const debug = require('debug')('src-ssr:api_authentication:lib:helpers')
const bcrypt = require('bcryptjs')

const helpers = {}

helpers.encryptPassword = async (password) => {
  debug('Encrypt password.')
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

helpers.matchPassword = async (password, savedPassword) => {
  try {
    debug('Check passwords.')
    return await bcrypt.compare(password, savedPassword)
  } catch (e) {
    console.log(e)
  }
}

module.exports = helpers
