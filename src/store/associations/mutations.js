export function getAssociationMutation (state, data) {
  // console.log('getAssociationMutation')
  state.association = data
  // console.log('state.association = ' + JSON.stringify(state.association))
}

export function getAllAssociationsMutation (state, data) {
  // console.log('getAllCategoriesMutation')
  // console.log(data)
  state.allAssociations = data
  // console.log('STATE.allAssociations ' + state.allAssociations)
}
