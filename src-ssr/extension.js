/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Note: This file is used for both PRODUCTION & DEVELOPMENT.
 * Note: Changes to this file (but not any file it imports!) are picked up by the
 * development server, but such updates are costly since the dev-server needs a reboot.
 */
module.exports.extendApp = async function ({ app, ssr }) {
  const db = require('./db/models')
  const morgan = require('morgan')

  const passport = require('passport')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
  const PassportLocal = require('passport-local').Strategy

  app.use(morgan('dev'))

  app.use(cookieParser('Mi ultra secreto'))
  app.use(session({
    secret: 'Secreto de sesion',
    resave: true, // Aunque la sesion no se modifique, se vuelve a guardarv
    saveUninitialized: true // Si inicializa se sesion y no se le guarda nada, se guarda.
  }))
  // PASSPORT
  require('./api/lib/passport')
  app.use(passport.initialize())
  app.use(passport.session())

  // passport.use(new PassportLocal(function (username, password, done) {
  //   // JSON es el objeto con el que se hace sesion
  //   // done(err, {name: 'Javier'})
  //   if (username === 'codigofacilito' && password === '12345678') {
  //     // Buscar en la base de datos
  //     return done(null, { id: 1, name: 'Cody' })
  //   }
  //   // No existe el usuario
  //   done(null, false)
  // }))

  // passport.serializeUser(function (user, done) {
  //   done(null, user.id)
  // })

  // passport.deserializeUser(function (id, done) {
  //   done(null, { id: 1, name: 'Cody' })
  // })

  // ROUTES
  app.use('/api/threads', require('./api/routes/threads.routes'))
  app.use('/api/posts', require('./api/routes/posts.routes'))
  app.use('/api/users', require('./api/routes/users.routes'))

  // SINCRONIZAMOS BD
  await db.sequelize.sync({ force: false })
    .then(() => {
      console.log('BD Conected.')
    })
    .catch(err => {
      console.log(err)
    })
}
