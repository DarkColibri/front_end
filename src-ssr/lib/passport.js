const debug = require('debug')('src-ssr:api_authentication:lib:passport')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// const crud = require('../api/crud')
const model = require('../api/users/model')

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
      // debug('SignIn ' + username)
      // const rows = await repository.getUser(username)
      const rows = await model.findAll({
        where: { name: username }
      })
      // debug('Existe usuario..... [OK]')
      if (rows.length > 0) {
        const user = rows[0].dataValues
        // debug(user)
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
          // debug('Passwords OK - SuccessRedirect >>>>>')
          // done(null, user, req.flash('success', 'Welcome ' + user.username))
          done(null, user)
        } else {
          // debug('Passwords FAIL - failureRedirect >>>>>')
          // done(null, false, req.flash('message', 'Incorrect Password'))
          done(null, false)
        }
      } else {
        return done(null, false)
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
      // debug('SignUp')
      // debug(req.body)
      const { email, age, roleId } = req.body
      const newUser = {
        name: username,
        password,
        email: email,
        age: age,
        roleId: roleId
      }
      // debug('Encrypt password')
      newUser.password = await helpers.encryptPassword(password)

      // Saving in the Database
      // debug('Saving user in Database')
      const resultado = await model.create(newUser)
      newUser.id = resultado.id
      return done(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => {
  // debug('Serialize user. Asignamos el user.id' + user.id)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  // debug('DesSerialize user. BUSCAMOS EL USUARIO ' + id + ' EN LA BD.')
  const data = await model.findOne({ where: { id: id } })
  // const rows = await model.findOne(id)
  done(null, data)
})
