'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'maria',
        password: '$2a$10$WibjEsRi11CzC2IaoxRyMurZxyYJeP.2KaG/71o6u4toLueSQpDqG',
        age: 30,
        email: 'maria@email.com',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'javier',
        password: '$2a$10$JfHDTd9u1K7l6B6h7pq2ketkTk.8oflsgwHU1giakZhLlHJlSJlOW',
        age: 31,
        email: 'javier@email.com',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'pedro',
        password: 'Reduccion de daños del alcochol',
        age: 32,
        email: 'pedro@email.com',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
