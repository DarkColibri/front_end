const debug = require('debug')('src-ssr:api:user:model')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const sequelize = require('../../db')

const { DataTypes, Model } = Sequelize

class User extends Model {
  /**
   * setup model CRUD operation association
   *   createdAt foreignKey creatorId as creator
   *   updatedAt foreignKey updaterId as updater
   *   paranoid  foreignKey deleterId as deleter
   * @param  {Object} model Sequelize source model
   * @return {void}       setup source model associations with User model
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

  static async getHash (password) {
    debug(`Generamos la HASH para el password: ${password}`)
    const salt = await bcrypt.genSalt(10)
    debug(`Creamos la HASH con la SALT ${salt}`)
    const hash = await bcrypt.hash(password, salt)
    debug(`HASH ${hash}`)

    return hash
  }

  static async hashPassword (user) {
    debug('hashPassword()')
    debug(user)
    if (user.changed('password')) {
      debug('Asignamos el password al usuario.')
      user.set('password', await this.getHash(user.password))
    }
  }

  get name () {
    debug(`${this.firstName} ${this.lastName}`)
    return `${this.firstName} ${this.lastName}`
  }
}

module.exports = User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: DataTypes.STRING(20),
    password: DataTypes.CHAR(60).BINARY
  },
  {
    sequelize,
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['password'] }
    }
  }
)

// eslint-disable-next-line @typescript-eslint/unbound-method
User.beforeSave(User.hashPassword)
