export function getAllPostsMutation (state, data) {
  console.log('getAllPostsMutation')
  state.postsState = data
  console.log('STATE.postsState ' + JSON.stringify(state.postsState))
}
