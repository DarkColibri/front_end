const debug = require('debug')('src-ssr:api_authentication:lib:passport')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const pool = require('../database')
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
      debug('LocalStrategt ...... [local.loguin] ' + username)
      const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
      debug('Existe usuario.')
      if (rows.length > 0) {
        const user = rows[0]
        debug('Check password.')
        const validPassword = await helpers.matchPassword(password, user.password
        )
        debug('Password OK')
        if (validPassword) {
          debug('Hacemos el successRedirect')
          done(null, user, req.flash('success', 'Welcome ' + user.username))
        } else {
          done(null, false, req.flash('message', 'Incorrect Password'))
        }
      } else {
        return done(
          null,
          false,
          req.flash('message', 'The Username does not exists.')
        )
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
      debug('SIGNUP')
      debug(req.body)
      const { fullname } = req.body
      const newUser = {
        fullname,
        username,
        password
      }
      debug('Encrypt password')
      newUser.password = await helpers.encryptPassword(password)
      // Saving in the Database
      debug('Saving user in Database')
      const result = await pool.query('INSERT INTO users SET ? ', newUser)
      newUser.id = result.insertId
      return done(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => {
  debug('SERIALIZE User')
  debug('ASIGNAMOS NULL AL USUARIO')
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  debug('DES_SERIALIZE User.')
  debug('BUSCAMOS EL USUARIO EN LA BD.')
  debug(id)
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  done(null, rows[0])
})
