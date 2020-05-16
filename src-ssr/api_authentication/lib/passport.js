const debug = require('debug')('src-ssr:api_authentication:lib:passport')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const pool = require('../database')

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
      debug('LocalStrategt ...... [local.loguin] ' + username)
      // const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
      // debug(rows)
      // debug('::::::::::::::::::::::::::::::::::::::::::::::::::::')
      const rows2 = await repository.getUser(username)
      // debug(rows2[0].dataValues)
      // const userPrueba = rows2[0].dataValues
      // debug('::::::::::::::::::::::::::::::::::::::::::::::::::::')
      // debug(userPrueba)
      // debug(userPrueba.id)

      debug('Existe usuario.')
      if (rows2.length > 0) {
        const user = rows2[0].dataValues
        // const user = rows[0]
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
      debug('>>  SIGNUP  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      debug(req.body)
      const { email, age, roleId } = req.body
      // const newUser = {
      //   fullname,
      //   username,
      //   password
      // }
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      const newUserNuevo = {
        name: username,
        password,
        email: email,
        age: age,
        roleId: roleId
      }
      debug('Encrypt password')
      // newUser.password = await helpers.encryptPassword(password)
      newUserNuevo.password = await helpers.encryptPassword(password)
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // newUserNuevo.password = newUser.password

      // Saving in the Database
      debug('Saving user in Database')
      // const result = await pool.query('INSERT INTO users SET ? ', newUser)
      // debug(result)
      // newUser.id = result.insertId
      // // return done(null, newUser)

      // debug('SALVANDO USUARIO NUEVO')
      const resultado2 = await repository.create(newUserNuevo)
      // debug(resultado2)
      // debug(resultado2.id)
      newUserNuevo.id = resultado2.id
      return done(null, newUserNuevo)
    }
  )
)

passport.serializeUser((user, done) => {
  debug('Serialize user. Asignamos el user.id' + user.id)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  debug('DES_SERIALIZE User. BUSCAMOS EL USUARIO EN LA BD.')
  // const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  // debug(rows[0])
  // // done(null, rows[0])

  // debug('[1] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  const rows2 = await repository.findOne(id)
  // debug(JSON.parse(JSON.stringify(rows2)))
  // debug(rows2.id)
  const user = {
    id: rows2.id,
    name: rows2.name,
    password: rows2.password,
    age: rows2.age,
    email: rows2.email,
    roleId: rows2.roleId
  }
  // debug('::::::::::::::::::::::::::::::::::::::::::::::::::::')
  debug(user)
  // // debug(userPrueba.id)
  // // debug(JSON.parse(JSON.stringify(rows2)))
  // debug('[2] <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  // done(null, JSON.parse(JSON.stringify(rows2)))
  done(null, user)
})
