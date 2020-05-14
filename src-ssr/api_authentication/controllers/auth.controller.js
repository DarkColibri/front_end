const debug = require('debug')('src-ssr:api_authentication:controller:auth.controler')
const authCtrl = {}
const passport = require('passport')

// Hace el login
authCtrl.signIn = passport.authenticate('local.signin', {
  successRedirect: '/users',
  failureRedirect: '/signin',
  failureFlash: true
})

authCtrl.signUp = passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})

authCtrl.renderSignUp = (req, res, next) => {
  debug('SIGNUP')
  res.render('auth/signup')
  // Sigue con el proceso
  next()
}

// Muestra pantalla de LOGIN
authCtrl.renderSignIn = (req, res, next) => {
  debug('SIGNIN')
  res.render('auth/signin')
  // Sigue con el proceso
  next()
}

authCtrl.logout = (req, res, next) => {
  debug('Logout')
  req.logOut()
  res.redirect('/')
  next()
}

module.exports = authCtrl
