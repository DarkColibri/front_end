const express = require('express')
const { StatusError } = require('./errors')
const { identifyRoute } = require('./middlewares')

function defaultRespond (req, res, responseBody) {
  if (responseBody === undefined) res.sendStatus(200)
  else res.send(responseBody)
}

/**
 * REST Resource route builder
 * @param  {String} routeId  route identifier
 * @param  {Object} resource Object configuration in resourceRoute format
 * @return {Void}          mount middlewares for rest endpoints
 */
function resourceRoute (routeId, resource) {
  const router = express.Router({ caseSensitive: true, mergeParams: true })
  const idParam = resource.id

  if (resource.load) {
    router.param(idParam, (req, res, next, reqParam) =>
      resource.load(req, reqParam).then((value) => {
        if (value === null || value === undefined) {
          throw new StatusError(StatusError.NOT_FOUND)
        }

        req[idParam] = value
        return null
      }).then(next, next))
  }

  function mount (method, url, fn) {
    console.log('================================================')
    console.log(method)
    console.log(url)
    console.log(fn)
    console.log(routeId)

    if (!resource[fn]) return null

    const responder = resource.respond || defaultRespond
    console.log(`[${routeId}-${fn}]`)
    console.log('************************************************')

    return router[method](
      url,
      identifyRoute(`${routeId}-${fn}`),
      (req, res, next) =>
        resource[fn](req, res)
          .then(responseBody => responder(req, res, responseBody), next)
    )
  }

  mount('get', '/', 'index')
  mount('post', '/', 'create')
  mount('put', '/', 'updateRoot')
  mount('patch', '/', 'patchRoot')
  mount('delete', '/', 'destroyRoot')

  if (resource.subresourcesRoot) {
    [...Object.entries(resource.subresourcesRoot)].forEach(([subresourceName, subresource]) =>
      router.use(`/${subresourceName}`, resourceRoute(`${routeId}-${subresourceName}`, subresource)))
  }

  mount('get', `/:${idParam}`, 'load')
  mount('put', `/:${idParam}`, 'update')
  mount('patch', `/:${idParam}`, 'patch')
  mount('delete', `/:${idParam}`, 'destroy')

  // POSTS - Posts por threads
  // http://localhost:8080/api/posts/threads/{id}
  // mount('get', `/threads/:${idParam}`, 'threads')

  if (resource.subresources) {
    [...Object.entries(resource.subresources)].forEach(([subresourceName, subresource]) =>
      router.use(
        `/:${idParam}/${subresourceName}`,
        resourceRoute(`${routeId}-${subresourceName}`, subresource)
      ))
  }
  console.log(JSON.stringify(resource))

  return router
}

module.exports = resourceRoute
