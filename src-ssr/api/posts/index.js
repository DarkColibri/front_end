const Model = require('./model')
const debug = require('debug')('src-ssr:api:posts:index')

const id = 'resource' // since res.user is set by passport
const URL = 'http://localhost:8080/prueba/posts'

async function index () {
  debug('GET ' + URL)
  debug('INDEX')
  const data = await Model.findAll()
  // debug(data)
  return { data }
}

async function load ({ params }) {
  // debug('GET ' + URL + '/' + params[id])
  // debug('LOAD')
  const data = await Model.findOne({ where: { id: params[id] } })
  return { data }
}

async function create ({ body }) {
  const data = await new Model(body).save()
  return { data }
}

async function update ({ body, resource }) {
  const data = await Model.update(body, { where: { id: resource.data.id } })
  // {"data": [1]}
  return { data }
}

async function destroy ({ resource }) {
  const data = await Model.destroy({ where: { id: resource.data.id } })
  return { data }
}

function updateRoot ({ resource }) {
  console.log('UPDATEROOT !')
  return { ok: true }
}

// async function threads ({ params }) {
//   const data = await Model.findAll({ where: { threadId: params[id] } })
//   return { data }
// }

module.exports = {
  id,
  index,
  load,
  create,
  update,
  destroy,
  updateRoot
  // threads
}
