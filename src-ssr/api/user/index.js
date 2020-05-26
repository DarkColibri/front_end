const User = require('./model')
const debug = require('debug')('src-ssr:api:user:index')

const id = 'resource' // since res.user is set by passport

async function index () {
  const data = await User.findAll()
  return { data }
}

async function load ({ params }) {
  debug(params)
  debug('LOAD')
  const data = await User.findById(params[id])
  return { data }
}

function show ({ resource }) {
  debug(resource)
  debug('SHOW')
  return { data: resource }
}

async function create ({ body }) {
  debug(body)
  debug('create')
  const data = await new User(body).save()
  return { data }
}

async function update ({ body, resource }) {
  await resource.update(body)
  return { data: resource }
}

async function destroy ({ resource }) {
  await resource.destroy()
  return { ok: true }
}

module.exports = {
  id,
  index,
  load,
  show,
  create,
  update,
  destroy
}
