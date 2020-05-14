// -------------------------------------------------------------------------
//    AUTENTICACIÓN
// -------------------------------------------------------------------------
const debug = require('debug')('src-ssr:auth:local:index')
const express = require('express')
const passport = require('passport')

const router = express.Router()

// -------------------------------------------------------------------------
//  POST http://localhost:3333/auth/local/
// -------------------------------------------------------------------------

// router.post('/', passport.authenticate('local', {
//   successRedirect: '/api/users',
//   failureRedirect: '/auth/login?error'
// }
// ))
router.post('/', (req, res, next) => {
  debug(`POST ${req.baseUrl}`)
  debug(req.body)
  debug('************************************************************')

  res.format({
    html: passport.authenticate('local', {
      // successReturnToOrRedirect: '/',
      successRedirect: '/users',
      failureRedirect: '/auth/login?error'
    }),
    json:
    passport.authenticate('local', (err, user, info) => {
      debug('User authenticated.')
      const error = err || info
      if (error) return res.status(401).json(error)

      if (user) {
        debug(`User: ${JSON.stringify(user)}`)
        return req.login(user, loginError => {
          debug(' ++++++      Hacemos req.login      ++++++++')
          debug(req.user)
          debug('oooooooooooooooooooooooooooooooo')
          if (loginError) return next(loginError)
          return res.json({ data: user })
        })
      }

      return res
        .status(404)
        .json({ message: 'Something went wrong, please try again.' })
    })
  })

  debug('MM M M M M M M M M M M M M MM')
})

module.exports = router
