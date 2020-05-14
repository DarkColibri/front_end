const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const passporte = require('passport')

router
  .use(cors())
  .use(bodyParser.json())
  .use(compression())

router.post('/singup', (req, res) => {
  console.log('[1] >>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(passporte)
  console.log('==============================')
  passporte.authenticate('localico', {
    successRedirect: '/profile',
    failureRedirect: 'login'
  })
  console.log('[2] >>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(passporte)
  console.log('==============================')
  res.send(req.body)
  // res.send('enviado')
})

router.post('/profile', (req, res) => {
  console.log('==============================')
  res.send('PEOFILE')
  // res.send('enviado')
})

module.exports = router
