const debug = require('debug')('web:src-src:api:repository:base')

class BaseRepository {
  constructor (db, entity) {
    this._db = db
    this.entity = entity
  }

  async findAll () {
    // debug('FIND ALL: ' + this.entity + '\n')
    const entities = await this._db[this.entity].findAll()
    // debug('REQUEST: '+ JSON.stringify( entities ))
    if (!entities) return null
    return entities
  }

  async findOne (id) {
    debug('REPOSITORY FIND ONE: ' + id + '\n')
    // debug(req.params)
    const entity = await this._db[this.entity].findOne({ where: { id } })
    // debug('REQUEST: '+ JSON.stringify( entity ))
    if (!entity) return null
    return entity
  }

  async create (body) {
    debug('REPOSITORY CREATE: ' + JSON.stringify(body) + '\n')
    const createdEntitY = await this._db[this.entity].create(body)
    // debug('REQUEST: ' + JSON.stringify(createdEntitY))
    if (!createdEntitY) return null
    return createdEntitY
  }

  async update (id, entity) {
    debug('REPOSITORY UPDATE: ' + id + '\n')
    // No permite nulos. Los eliminamos
    delete entity.createAt
    delete entity.updateAt
    const update = await this._db[this.entity].update(entity, { where: { id } })
    if (!update) return null
    return update
  }

  async delete (id) {
    debug('REPOSITORY DELETE: ' + id + '\n')
    const deleted = await this._db[this.entity].destroy({ where: { id } })
    // debug('REQUEST: ' + JSON.stringify(deleted))
    if (!deleted) return null
    return deleted
  }

  // POSTS
  // Meteremos los métodos que no son crud
  getThreadsPosts (thread) {
    debug('REPOSITORY GET THREADS ' + thread)
    return this._db[this.entity].findAll({
      where: { threadId: thread }
    })
  }

  // USER
  // Obtiene un usuario por nobre y password
  getUser (body) {
    debug(('REPOSITORY getUser: ' + JSON.stringify(body) + '\n'))
    return this._db[this.entity].findAll({
      where: { name: body.name, password: body.password }
    })
  }
}

module.exports = BaseRepository
