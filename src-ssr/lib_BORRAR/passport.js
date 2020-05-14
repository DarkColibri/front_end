const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../db/models')
const Repository = require('../repositoy/base.repository')
const repository = new Repository(db, 'users')

passport.use('localico', new LocalStrategy({
  // ENTRADA
  // dataIn: 'dataIn',
  usernameField: 'name',
  passwordField: 'password',
  // Para obtener el req.body
  passReqToCallback: false
// Una vez iniciado el LocalStrategy se ejecuta:
// }, (req, name, password, dcone) => {
}, (req, usernameField, passwordField, done) => {
  console.log('****** PASSPORT *****')
  console.log(req.body)
  // repository.create(req.body)
  //   .then(result => {
  //     console.log('[OK] ' + JSON.stringify(result))
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}))

// guarda en la sesion
// passport.serielizeUser((usr, done) => {

// })
