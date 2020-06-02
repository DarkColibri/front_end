export function setCategoryMutation (state, data) {
  state.category = data
  // console.log('state.category = ' + JSON.stringify(state.category))
}

export function setAllCategoriesMutation (state, data) {
  // console.log('getAllCategoriesMutation')
  // console.log(data)
  state.allCategories = data
  // console.log('STATE.threadsState ' + state.threadsState)
}
