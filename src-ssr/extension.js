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
  const { database } = require('./db/config/keys')

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

  app.use(session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }))
  // app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())

  // Global variables
  app.use((req, res, next) => {
    // app.locals.user = req.user
    next()
  })

  // // ROUTES
  app.use(require('./routes/auth.routes'))
  app.use('/api/asocat', require('./routes/associationcategories.router'))
  app.use('/api/associations', require('./routes/associations.router'))
  app.use('/api/categories', require('./routes/categories.router'))
  app.use('/api/posts', require('./routes/posts.routes'))
  app.use('/api/threads', require('./routes/threads.routes'))
  app.use('/api/users', require('./routes/users.routes'))

  // // SINCRONIZAMOS BD
  // await db.sequelize.sync({ force: false })
  //   .then(() => {
  //     console.log('BD Conected.')
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}
