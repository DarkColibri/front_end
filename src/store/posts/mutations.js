export function getAllPostsMutation (state, data) {
  console.log('GET ALL POST MUTATION')
  state.postsState = data
  console.log('STATE.POSTS_STATE ' + JSON.stringify(state.postsState))
}

export function nullMutation () {
  console.log('nullMutation')
  // state.postsState = data
  // console.log('STATE.postsState ' + JSON.stringify(state.postsState))
}
