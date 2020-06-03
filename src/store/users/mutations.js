const debug = require('debug')('src:store:USERS:mutations')

export function setUserMUT (state, data) {
  state.userLogin = data
  // debug('MUTATIONS GET USER')
  // debug('userLogin :' + JSON.stringify(state.userLogin))
}

export function setAllUsersMUT (state, data) {
  state.allUsers = data
  // debug('allUsers : ' + JSON.stringify(state.allUsers))
}

export function updateUserMUT (state, data) {
  console.log('======== UPDATE =========')
  console.log(data)
  // Object.assign(state.)
}
