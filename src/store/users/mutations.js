const debug = require('debug')('src:store:USERS:mutations')

export function getUserMUT (state, data) {
  state.userLogin = data
  debug('MUTATIONS GET USER')
  debug('userLogin :' + JSON.stringify(state.userLogin))
}

export function getAllUsersMUT (state, data) {
  state.allUsersState = data
  debug('allUsersState : ' + JSON.stringify(state.allUsersState))
}
