const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../../db/models')
const Repository = require('../repositoy/base.repository')
const repository = new Repository(db, 'users')

passport.use(new LocalStrategy({
  // ENTRADA
  dataIn: 'dataIn',
  // nameField: 'name',
  // password: 'password',
  // Para obtener el req.body
  passReqToCallback: true
// Una vez iniciado el LocalStrategy se ejecuta:
// }, (req, name, password, dcone) => {
}, (req, dataIn, done) => {
  console.log('****** PASSPORT *****')
  console.log(req.body)
  repository.create(req.body)
    .then(result => {
      console.log('[OK] ' + JSON.stringify(result))
    })
    .catch(err => {
      console.log(err)
    })
}))

// guarda en la sesion
// passport.serielizeUser((usr, done) => {

// })
