const debug = require('debug')('src-ssr:api_authentication:lib:auth')

module.exports = {
  isLoggedIn (req, res, next) {
    debug('User is loged ?')
    if (req.isAuthenticated()) return next()
    res.redirect('/signin')
  }
}
