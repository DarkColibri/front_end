export function getUserMUT (state, data) {
  state.userState = data
  // console.log('[MUTATION userState] ' + JSON.stringify(state.userState))
}

export function getAllUsersMUT (state, data) {
  state.allUsersState = data
  console.log('[MUTATION allUsersState] ' + JSON.stringify(state.allUsersState))
}
