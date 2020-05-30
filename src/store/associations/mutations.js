export function setAssociationMutation (state, data) {
  // console.log(data)
  state.association = data
  // console.log('state.association = ' + JSON.stringify(state.association))
}

export function setAllAssociationsMutation (state, data) {
  // console.log(data)
  state.allAssociations = data
  // console.log('STATE.allAssociations ' + state.allAssociations)
}
