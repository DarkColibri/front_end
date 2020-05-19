const debug = require('debug')('src-ssr:api_authentication:lib:passport')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// const pool = require('../database')

const db = require('../../db/models')
const Repository = require('../../repositoy/base.repository')
const repository = new Repository(db, 'users')

const helpers = require('./helpers')

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      debug('SignIn ' + username)
      const rows = await repository.getUser(username)

      debug('Existe usuario..... [OK]')
      if (rows.length > 0) {
        const user = rows[0].dataValues
        debug(user)
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
          debug('Passwords OK - SuccessRedirect >>>>>')
          // done(null, user, req.flash('success', 'Welcome ' + user.username))
          done(null, user)
        } else {
          debug('Passwords FAIL - failureRedirect >>>>>')
          // done(null, false, req.flash('message', 'Incorrect Password'))
          done(null, false)
        }
      } else {
        return done(null, false, req.flash('message', 'The Username does not exists.'))
      }
    }
  )
)

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      debug('SignUp')
      debug(req.body)
      const { email, age, roleId } = req.body
      const newUser = {
        name: username,
        password,
        email: email,
        age: age,
        roleId: roleId
      }
      debug('Encrypt password')
      newUser.password = await helpers.encryptPassword(password)

      // Saving in the Database
      debug('Saving user in Database')
      const resultado = await repository.create(newUser)
      newUser.id = resultado.id
      return done(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => {
  debug('Serialize user. Asignamos el user.id' + user.id)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  debug('DesSerialize user. BUSCAMOS EL USUARIO EN LA BD.')
  const rows = await repository.findOne(id)
  const user = {
    id: rows.id,
    name: rows.name,
    password: rows.password,
    age: rows.age,
    email: rows.email,
    roleId: rows.roleId
  }
  debug('User deserializado: ' + JSON.stringify(user))
  done(null, user)
})
