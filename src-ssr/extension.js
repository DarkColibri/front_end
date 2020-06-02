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
module.exports.extendApp = function ({ app, ssr }) {
  const debug = require('debug')('src-ssr:extension')
  const morgan = require('morgan')

  const session = require('express-session')
  const passport = require('passport')

  const MySQLStore = require('express-mysql-session')(session)
  const bodyParser = require('body-parser')

  // CONFIG database
  // debug('[CONFIG DB]:')
  // const db = require('./db')

  // debug('API DE PRUEBA!!! ')
  // const api = require('./api')

  debug('MIDDLEWARES')
  const { errorHandler } = require('./components/middlewares')

  // Intializations
  require('./lib/passport')
  /**
   * Reading Environment Variables
   */
  const dotenv = require('dotenv')
  dotenv.config()

  // Middlewares
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  const { database } = require('./db/config/keys')
  app.use(session({
    key: 'session_cookie_dg',
    secret: 'session_cookie_secret_dg',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }))
  // app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())

  // // Global variables
  // app.use((req, res, next) => {
  //   // app.locals.user = req.user
  //   next()
  // })

  // ROUTES
  // OK
  const associationApi = require('./api/associations/association.api')
  app.use('/api/associations', associationApi)
  // OK
  const categoryApi = require('./api/categories/categories.api')
  app.use('/api/categories', categoryApi)
  // OK
  const assocatApi = require('./api/assocat/assocat.api')
  app.use('/api/assocat', assocatApi)
  // OK
  const rolApi = require('./api/roles/roles.api')
  app.use('/api/roles', rolApi)
  // OK
  const threadApi = require('./api/threads/threads.api')
  app.use('/api/threads', threadApi)
  // OK
  const postApi = require('./api/posts/posts.api')
  app.use('/api/posts', postApi)

  app.use(require('./routes/auth.routes'))

  const userApi = require('./api/users/users.api')
  app.use('/api/users', userApi)

  // app.use('/api/asocat', require('./routes/associationcategories.router'))
  // app.use('/api/associations', require('./routes/associations.router'))
  // app.use('/api/categories', require('./routes/categories.router'))
  // app.use('/api/posts', require('./routes/posts.routes'))
  // app.use('/api/threads', require('./routes/threads.routes'))

  app.use(errorHandler)
  // // SINCRONIZAMOS BD

  // await db.sequelize.sync({ force: false })
  //   .then(() => {
  //     console.log('BD Conected.')
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}
