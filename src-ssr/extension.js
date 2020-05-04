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
  app.use(morgan('dev'))

  // const routes = require('./api/routes')
  // const authentication = require('./api/routes/authentication')
  // const threads = require('./api/routes/threads.routes')

  // ROUTER
  // app.use('/api/threads', threads)

  // ROUTES ////////////////////////////////////////////////////////
  app.use('/api/threads', require('./api/routes/threads.routes'))
  app.use('/api/posts', require('./api/routes/posts.routes'))
  app.use('/api/users', require('./api/routes/users.routes'))

  app.get('/prueba', (req, res) => {
    console.log('HACEMOS LINK!!')
  })

  // SINCRONIZAMOS BD
  await db.sequelize.sync({ force: false })
    .then(() => {
      console.log('BD Conected.')
    })
    .catch(err => {
      console.log(err)
    })
}
