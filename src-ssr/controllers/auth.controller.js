const debug = require('debug')('src-ssr:api_authentication:controller:auth')
const authCtrl = {}
const passport = require('passport')

// LOGIN
authCtrl.signIn = passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin'
})
// SIGNUP
authCtrl.signUp = passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup'
})

// LOGOUT
authCtrl.logout = (req, res, next) => {
  debug('Logout')
  req.logOut()
  res.redirect('/')
  next()
}

// BORRAR

// authCtrl.renderSignUp = (req, res, next) => {
//   debug('SIGNUP')
//   res.render('auth/signup')
//   // Sigue con el proceso
//   next()
// }

// // Muestra pantalla de LOGIN
// authCtrl.renderSignIn = (req, res, next) => {
//   debug('SIGNIN')
//   res.render('auth/signin')
//   // Sigue con el proceso
//   next()
// }

module.exports = authCtrl
