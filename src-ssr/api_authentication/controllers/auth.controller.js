const debug = require('debug')('src-ssr:api_authentication:controller:auth.controler')
const authCtrl = {}
const passport = require('passport')

authCtrl.renderSignUp = (req, res, next) => {
  debug('SIGNUP')
  res.render('auth/signup')
  // Sigue con el proceso
  next()
}

authCtrl.signUp = passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}, (req, res) => {
  debug('User Created..... [OK]')
})

// Muestra pantalla de LOGIN
authCtrl.renderSignIn = (req, res, next) => {
  debug('SIGNIN')
  res.render('auth/signin')
  // Sigue con el proceso
  next()
}

authCtrl.signIn = passport.authenticate('local.signin', {
  successRedirect: '/users',
  failureRedirect: '/signin',
  failureFlash: true
})

authCtrl.logout = (req, res, next) => {
  debug('Logout')
  req.logOut()
  res.redirect('/')
  next()
}

module.exports = authCtrl
