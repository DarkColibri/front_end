// const Model = require('./posts/model')
const debug = require('debug')('src-ssr:api:crud')
const path = require('path')

const id = 'resource' // since res.user is set by passport

// MODEL
function selectModel (dir) {
  // debug(dir)
  const model = require(path.join('../', dir, '/model.js'))
  return model
}
// GET ALL
async function index (request) {
  // debug('INDEX ' + request.method + ' ' + request.originalUrl)
  const table = selectModel(request.baseUrl)
  const data = await table.findAll()
  return { data }
}
// GET ONE
async function load (request) {
  // debug('LOAD ' + request.method + ' ' + request.originalUrl)
  const { params } = request
  const table = selectModel(request.baseUrl)
  const data = await table.findOne({ where: { id: params[id] } })
  return { data }
}
// CREATE
async function create (request) {
  try {
    const { body } = request
    const table = selectModel(request.baseUrl)
    const data = await table.create(body)
    return { data }
  } catch (err) {
    debug('ERROR: ' + err)
    return { data: { error: err } }
  }
}
// UPDATE
async function update (request) {
  // debug('UPDATE ' + request.method + ' ' + request.originalUrl)
  // const { body, resource, params } = request
  const { body, params } = request
  try {
    const table = selectModel(request.baseUrl)
    const data = await table.update(body, { where: { id: params.resource } })
    return { data } // OK = {"data": [1]}
  } catch (err) {
    debug('ERROR: ' + err)
    return { data: { error: err } }
  }
}

// DESTROY
async function destroy (request) {
  try {
    // debug('desrtoy ' + request.method + ' ' + request.originalUrl)
    const { resource, params } = request

    const table = selectModel(request.baseUrl)
    const data = await table.destroy({ where: { id: params.resource } })
    return { data }
  } catch (err) {
    debug('ERROR: ' + err)
    return { data: { error: err } }
  }
}

// -------------------------------------------------------------------------------------
// FORCE PARANOID

// GET ALL with DELETED
async function indexForce (request) {
  // debug('INDEX PARANOID ' + request.method + ' ' + request.originalUrl)
  const table = selectModel(request.baseUrl)
  const data = await table.findAll({ paranoid: false })
  return { data }
}

// GET ONE with DELETED
async function loadForce (request) {
  // debug('LOAD PARANOID ' + request.method + ' ' + request.originalUrl)
  const { params } = request
  const table = selectModel(request.baseUrl)
  const data = await table.findOne({ where: { id: params[id] }, paranoid: false })
  return { data }
}

// DELETE FORCE
async function destroyForce (request) {
  try {
    // debug('DESTROY FORCE ' + request.method + ' ' + request.originalUrl)
    const { resource, params } = request
    debug(params)
    const table = selectModel(request.baseUrl)
    const data = await table.destroy({ where: { id: params.resource }, force: true })
    return { data }
  } catch (err) {
    debug('ERROR: ' + err)
    return { data: { error: err } }
  }
}

module.exports = {
  id,
  index,
  load,
  create,
  update,
  destroy,
  indexForce,
  loadForce,
  destroyForce
}
