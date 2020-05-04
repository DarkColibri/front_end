const debug = require('debug')('web:src:store:mutation:users')

export function getUserMUT (state, data) {
  state.userState = data
  debug('USER ' + state.allUsersState)
}

export function getAllUsersMUT (state, data) {
  state.allUsersState = data
  debug('USERS ' + state.allUsersState)
}
