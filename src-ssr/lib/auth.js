const debug = require('debug')('src-ssr:api_authentication:lib:auth')

module.exports = {
  isLoggedIn (req) {
    if (req.isAuthenticated()) {
      // debug('User loged ... [ YES ]')
      return true
    }
    // debug('User loged ... [ NO ]')
    return false
    // res.redirect('/login')
  }
}

// module.exports = {
//   isLoggedIn (req, res, next) {
//     if (req.isAuthenticated()) {
//       debug('User loged ... [ YES ]')
//       return next()
//     }
//     debug('User loged ... [ NO ]')
//     res.redirect('/login')
//   }
// }
