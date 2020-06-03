// Elimina el usuario logueado de la lista
export function allUsers (state) {
  const usersFiltered = {}
  Object.keys(state.allUsers).forEach(key => {
    const id = state.allUsers[key].id
    const idLogin = state.userLogin.id
    if (idLogin !== id) {
      usersFiltered[key] = state.allUsers[key]
    }
  })
  return usersFiltered
}

export function userLogin (state) {
  return state.userLogin
}
