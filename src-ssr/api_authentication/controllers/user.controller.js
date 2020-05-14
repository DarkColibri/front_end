const debug = require('debug')('src-ssr:api_authentication:controller:user.controller')
const userCtrl = {}

userCtrl.renderUserProfile = (req, res, next) => {
  debug('Render view profile.')
  res.render('profile')
  debug('Next ...')
  next()
}

module.exports = userCtrl
