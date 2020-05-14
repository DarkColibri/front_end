const debug = require('debug')('src-ssr:auth:local:passport')

const bcrypt = require('bcrypt')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

// AUTENTICACION CONTRA LA BD
async function localAuthenticate (User, email, password, done) {
  debug('localAuthenticate')
  debug('Buscamos el usuario en le BD.')

  const user = await User.findOne({ attributes: ['id', 'password'], where: { email } })
  debug('User OK')

  if (!user) return done(null, false, { message: 'This email is not registered.' })

  try {
    debug(`Comparamos passwords: ${password} - ${user.password}`)
    const authenticated = await bcrypt.compare(password, user.password)

    debug(authenticated)
    if (authenticated) {
      debug('Usuario autenticado. Buscamos el usiario y lo retornamos')
      // return done(null, await User.findById(user.id))
      return done(null, await User.findByPk(user.id))
    }
    debug('Password INCORRECTO')
    return done(null, false, { message: 'This password is not correct.' })
  } catch (err) {
    return done(err)
  }
}

module.exports = {
  setup (User) {
    debug('Creamos LocalStrategy')
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, (email, password, done) => {
      debug('Llamos a la autenticacion.')
      // debug(User)
      // debug('--')
      // debug(email)
      // debug('--')
      // debug(password)
      // debug('--')
      localAuthenticate(User, email, password, done)
    }))

    debug('Creamos Serializacion.')
    passport.serializeUser((user, done) => {
      debug('Usuario serializado')
      // debug(user)
      done(null, user)
    })

    debug('Creamos DES-serializacion.')
    passport.deserializeUser((user, done) => {
      debug('Usuario DES-serializado')
      // debug(user)
      done(null, user)
    })
  }
}
