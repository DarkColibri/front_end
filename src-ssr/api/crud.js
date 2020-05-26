const Model = require('./posts/model')
const debug = require('debug')('src-ssr:api:crud')
const path = require('path')

const id = 'resource' // since res.user is set by passport

function selectModel (dir) {
  debug(dir)
  const model = require(path.join('../', dir, '/model.js'))
  return model
}

async function index (model) {
  debug(model.method + ' ' + model.originalUrl)
  const table = selectModel(model.baseUrl)
  const data = await table.findAll()
  return { data }
}

async function load (model) {
  debug(model.method + ' ' + model.originalUrl)
  const { params } = model
  const table = selectModel(model.baseUrl)
  const data = await table.findOne({ where: { id: params[id] } })
  return { data }
}

async function create (model) {
  const { body } = model
  const table = selectModel(model.baseUrl)
  const data = await table.create(body)
  // const data = await new Model(body).save()
  return { data }
}

async function update (model) {
  const { body, resource } = model
  const table = selectModel(model.baseUrl)
  const data = await table.update(body, { where: { id: resource.data.id } })
  // {"data": [1]}
  return { data }
}

async function destroy (model) {
  const { resource } = model
  const table = selectModel(model.baseUrl)
  const data = await table.destroy({ where: { id: resource.data.id } })
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
