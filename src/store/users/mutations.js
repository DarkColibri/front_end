const debug = require('debug')('src:store:USERS:mutations')

export function getUserMUT (state, data) {
  state.userState = data
  debug('userState :' + JSON.stringify(state.userState.username))
}

export function getAllUsersMUT (state, data) {
  state.allUsersState = data
  debug('allUsersState : ' + JSON.stringify(state.allUsersState))
}
