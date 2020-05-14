// ------------------------------------------------------------------------------------------------- //
//    DATOS DEL SERVIDOR
// ------------------------------------------------------------------------------------------------- //
const debug = require('debug')('src-ssr:config:express')
// Seguridad Web mediante cabeceras.
const helmet = require('helmet')
const morgan = require('morgan')
// Peticiones POST
const bodyParser = require('body-parser')
// SESIONES
const expressSession = require('express-session')

// AUTENTICATION
const passport = require('passport')
const { env, session, db } = require('config') //  './environments/development.toml'
debug(`[env], ${env}`)
debug(`[session], ${JSON.stringify(session)}`)
debug(`[db], ${JSON.stringify(db)}`)

const MySQLStore = require('express-mysql-session')(expressSession)
// debug('MySQLStore ......... [ OK ]')

// FICHEROS
// debug('Cargamos ficheros')
// const filesupload = require('../fileupload')
// AUTENTICACION
const auth = require('../auth')
const api = require('../api')

const { errorHandler } = require('../components/middlewares')

// const session = require('express-session')
// const MySQLStore = require('express-mysql-session')(expressSession)

// const db = {
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   password: 'ortega',
//   database: 'transmedia_schema'
// }

// console.log(options)
// console.log(db)

const sessionStore = new MySQLStore(db)

// ------------------------------------------------------------------------------------------------- //
module.exports = function expressSetup (app) {
  debug('Load expressSetup() ...')
  app.set('env', env)

  app.use(helmet())
  app.use(morgan('dev'))
  // Body parser, to access req.body
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(
    expressSession({
      key: 'session_cookie_name',
      secret: 'session_cookie_secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

  // Sessions to create req.session
  //  app.use(expressSession(session))

  app.use(passport.initialize())
  app.use(passport.session())

  // app.use(morgan('dev'))

  // app.use('/filesupload', filesupload)
  app.use('/auth', auth)
  app.use('/api', api)
  app.use(errorHandler)
}
