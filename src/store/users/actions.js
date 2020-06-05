
import axios from 'axios'
const URL = 'http://localhost:8080/api/users/'

// LOGIN
export function UserLogin ({ commit }, fullPath) {
  try {
    // GET USER LOGIN
    axios.get('http://localhost:8080/api/users/getUserLogin')
      .then(response => {
        const user = response.data
        // console.log(user)
        // UPDATE ONLINE
        user.online = true
        commit('setUserMUT', user)
        // console.log('[UPDATE USER] ' + JSON.stringify(user))
        // console.log('[ID] ' + user.id)
        // dispatch('updateUser', user, user.id)
        axios.put(URL + user.id, user)
        if (fullPath === '/login') {
          this.$router.push('/profile')
        }
      })
      .catch(() => {
        console.log('No login !! Estamos en: ' + fullPath)
        commit('setUserMUT', null)
        if (fullPath !== '/' && fullPath !== '/login') {
          this.$router.push('/login')
        } else {
          console.log('mierder')
        }
      })
    // const response = await axios.get(URL)
    // const { data } = response.data
    // console.log('>>>>>> [USERS] ' + JSON.stringify(data))
    // commit('setAllUsersMUT', data)
  } catch (error) {
    commit('setUserMUT', null)
  }
}
// LOGOUT
export async function UserLogout ({ commit }, dataIn) {
  try {
    // Logout
    await axios.get('http://localhost:8080/logout')
    commit('setUserMUT', null)
    this.$router.push('/')
    // ONLINE = false
    const user = dataIn
    user.online = false
    await axios.put(URL + user.id, user)
  } catch (error) {
    commit('setUserMUT', null)
    this.$router.push('/')
  }
}
// GET ALL USERS
export async function getAllUsers ({ commit }) {
  try {
    console.log('[GET ALL USERS] ' + URL)
    // GET ALL users
    const response = await axios.get(URL)
    const { data } = response.data
    // console.log('[USERS] ' + JSON.stringify(data))
    commit('setAllUsersMUT', data)
  } catch (error) {
    console.error(error)
    commit('setAllUsersMUT', null)
  }
}
// GET USER BY NAME PASSWORD
export async function getUser ({ commit }, user) {
  try {
    // console.log('[ACTION GET USER] ' + JSON.stringify(user))
    const response = await axios.get(URL + user.name + '/' + user.password)
    // console.log('[ACTION USER] ' + JSON.stringify(response.data))
    commit('setUserMUT', response.data)
  } catch (error) {
    console.error(error)
    commit('setUserMUT', null)
  }
}
// CREATE
export async function createUser ({ commit }, dataIn) {
  try {
    // console.log('[CREATE USER] ' + JSON.stringify(dataIn))
    // POST new user
    // const instert = await axios.post(URL, dataIn)
    // const instert = await axios.post('http://localhost:8080/singup', dataIn)
    const instert = await axios.post(URL, dataIn)
    // console.log('[CREATED USER] ' + JSON.stringify(instert.data))
    // GET ALL users
    // const response = await axios.get(URL)
    // console.log('[ACTION][USERS]' + JSON.stringify(response.data))
    commit('setUserMUT', instert.data)
  } catch (error) {
    console.error(error)
    commit('setUserMUT', null)
  }
}
// ACTUALIZA USUARIO
export function updateUser ({ commit }, dataIn, id) {
  try {
    // console.log('[UPDATE USER] ' + JSON.stringify(dataIn))
    // console.log('[ID] ' + id)
    axios.put(URL + id, dataIn)

    // console.log('[UPDATE USER] ' + JSON.stringify(dataIn))
    // await axios.put(URL + id, dataIn)
    //
    // console.log('[USER UPDATED] ' + JSON.stringify(updated.data))
    // GET ALL users
    // const response = await axios.get(URL)
    // console.log('[USERS]' + JSON.stringify(response.data))
    // commit('setAllUsersMUT', response.data)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteUser ({ commit }, id) {
  try {
    // console.log('[DELETE USER] ' + id)
    const deleted = await axios.delete(URL + id)
    // console.log('[DELETE RESP] ' + deleted)
    // GET ALL users
    const response = await axios.get(URL)
    // console.log('[ACTION][USERS]' + JSON.stringify(response.data))
    commit('setAllUsersMUT', response.data)

    return deleted
  } catch (error) {
    console.error(error)
  }
}
// // LOGIN
// export async function UserLogin ({ commit }) {
//   try {
//     // GET USER LOGIN
//     await axios.get('http://localhost:8080/api/users/getUserLogin')
//       .then(response => {
//         const user = response.data
//         // console.log(user)
//         user.online = true
//         commit('setUserMUT', user)
//         // UPDATE ONLINE
//         axios.put(URL + user.id, user)
//         if (this.$router.fullPath === '/login') {
//           this.$router.push('/profile')
//         }
//       })
//       .catch(() => {
//         console.log('HHHH')
//         commit('setUserMUT', null)
//         if (this.$router.fullPath === '/' || this.$router.fullPath === '/login') {
//         } else {
//           this.$router.push('/login')
//         }
//       })
//     // const response = await axios.get(URL)
//     // const { data } = response.data
//     // console.log('>>>>>> [USERS] ' + JSON.stringify(data))
//     // commit('setAllUsersMUT', data)
//   } catch (error) {
//     commit('setUserMUT', null)
//   }
// }
// // LOGOUT
// export async function UserLogout ({ commit }, dataIn) {
//   try {
//     // Logout
//     await axios.get('http://localhost:8080/logout')
//     commit('setUserMUT', null)
//     this.$router.push('/')
//     // ONLINE = false
//     const user = dataIn
//     user.online = false
//     await axios.put(URL + user.id, user)
//   } catch (error) {
//     commit('setUserMUT', null)
//     this.$router.push('/')
//   }
// }

export async function getNameUser ({ commit }, id) {
  // console.log('ACCTION - http://localhost:8080/api/threads/')
  try {
    // console.log('getNameUser∫')
    const response = await axios.get(URL + id)
    // console.log(JSON.stringify(response.data.name))
    const { data } = response.data
    return data.name
  } catch (error) {
    console.error(error.data)
  }
}

// export function handleAuthStateChanged ({ commit, dispatch, state }) {
//   // COMPRUEBA SI USER LOGUED
//   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
//   axios.get('http://localhost:8080/api/users/getUserLogin')
//     .then(response => {
//       // OBTENEMOS DATOS USUARIO
//       const user = response.data
//       console.log('>>>>>>>>>>> USER>> >>>>>>>>>>>>>>>>>>>>')
//       console.log(user)
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
//       if (user) {
//         console.log('>>>>>>>>> Logged IN >>>>>>>>>>>>>>>>>>')
//         // User is logged in.
//         // HACEMOS COMMIT
//         commit('setUserMUT', user)
//         // ACTUALIZMOS EL USUARIO online
//         // console.log('>>>>>>>>>>> ACTUALIZMOS EL USUARIO online')
//         // user.online = true
//         dispatch('updateUser', user.id, user)
//         // OBTENEMOS USUARIOS
//         console.log('>>>>>>>>>>> OBTENEMOS USUARIOS >>>>>>>>')
//         dispatch('getAllUsers')
//         // this.$router.push('/')
//       } else {
//         // User is logged out.
//         console.log('>>>>>>>>> Logged UOT >>>>>>>>>>>>>>>>>')
//         user.online = false
//         dispatch('updateUser', state.userLogin.id, user)
//         commit('setUserMUT', {})
//         this.$router.replace('/login')
//       }
//       // axios.put(URL + data.id, data)
//     })
// }
