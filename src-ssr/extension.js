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

  /**
   * Reading Environment Variables
   */
  const dotenv = require('dotenv')
  dotenv.config()

  const expressApp = require('./api_authentication/app')
  /**
   * Importing the Main App
   */
  // const app = require('./app')
  expressApp(app)

  // Esto lo hace el index
  // app.listen(app.get('port'));
  // console.log('Server is in port', app.get('port'));

  // ============================================================
  // const db = require('./db/models')
  // // const morgan = require('morgan')
  // // app.use(morgan('dev'))
  // const { host, port } = require('config')

  // debug(`CONFIG = HOST:${host}, PORT:${port}`)

  // debug('[CONFIG EXPRESS]:')
  // const expressSetup = require('./config/express')
  // expressSetup(app)

  // // ROUTES
  app.use('/api/threads', require('./routes/threads.routes'))
  app.use('/api/posts', require('./routes/posts.routes'))
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
