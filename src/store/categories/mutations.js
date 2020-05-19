export function getCategoryMutation (state, data) {
  // console.log('getThreadMutation')
  state.categoryState = data
  // console.log('state.categoryState = ' + JSON.stringify(state.categoryState))
}

export function getAllCategoriesMutation (state, data) {
  // console.log('getAllThreadMutation')
  state.allCategoriesState = data
  // console.log('STATE.threadsState ' + state.threadsState)
}
