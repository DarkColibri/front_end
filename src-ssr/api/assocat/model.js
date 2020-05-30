const debug = require('debug')('src-ssr:api:assocat:model')
// const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const sequelize = require('../../db')

const { DataTypes, Model } = Sequelize

// eslint-disable-next-line @typescript-eslint/class-name-casing
class assocat extends Model {
  /**
   * setup model CRUD operation association
   *   createdAt foreignKey creatorId as creator
   *   updatedAt foreignKey updaterId as updater
   *   paranoid  foreignKey deleterId as deleter
   * @param  {Object} model Sequelize source model
   * @return {void}       setup source model assocat with association model
   */
  static trackModel (model) {
    const {
      options:
      {
        timestamps,
        createdAt = true,
        updatedAt = true,
        paranoid
      }
    } = model

    if (timestamps) {
      [
        ...(createdAt ? ['creator'] : []),
        ...(updatedAt ? ['updater'] : []),
        ...(paranoid ? ['deleter'] : [])
      ].forEach(as => model.belongsTo(this, { as }))
    }
  }

  static associate () {
    debug('Asociamos modelo')
    this.trackModel(this)
  }

  get content () {
    debug(this.content)
    return this.content
  }
}

module.exports = assocat.init(
  {
    categoryId: DataTypes.INTEGER,
    associationId: DataTypes.INTEGER
  },
  {
    sequelize,
    paranoid: true
    // defaultScope: {
    //   attributes: { exclude: ['password'] }
    // }
  }
)