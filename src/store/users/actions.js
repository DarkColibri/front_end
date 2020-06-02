
import axios from 'axios'
const URL = 'http://localhost:8080/api/users/'

export async function getAllUsers ({ commit }) {
  try {
    // console.log('[GET ALL USERS] ' + URL)
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

export async function getUser ({ commit }, user) {
  try {
    // console.log('[ACTION GET USER] ' + JSON.stringify(user))
    // GET user
    const response = await axios.get(URL + user.name + '/' + user.password)
    // console.log('[ACTION USER] ' + JSON.stringify(response.data))
    commit('setUserMUT', response.data)
  } catch (error) {
    console.error(error)
    commit('setUserMUT', null)
  }
}

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

export async function updateUser ({ commit }, dataIn, id) {
  try {
    // console.log('[UPDATE USER] ' + JSON.stringify(dataIn))
    const updated = await axios.put(URL + id, dataIn)
    //
    // console.log('[USER UPDATED] ' + JSON.stringify(updated.data))
    // GET ALL users
    const response = await axios.get(URL)
    // console.log('[USERS]' + JSON.stringify(response.data))
    commit('setAllUsersMUT', response.data)
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

// UTILIZAR USUARIO_LOGUEADO
export async function UserLogin ({ commit }, fullPath) {
  try {
    // console.log('ACTINON UserLogin - http://localhost:8080/api/users/getUserLogin')
    // GET USER LOGIN
    await axios.get('http://localhost:8080/api/users/getUserLogin')
      .then(response => {
        const data = response.data
        console.log(data)
        data.online = true
        commit('setUserMUT', data)
        axios.put(URL + data.id, data)
        if (fullPath === '/login') {
          this.$router.push('/profile')
        }
      })
      .catch(err => {
        console.error('Error al autenticar. ' + err)
        commit('setUserMUT', null)
        if (fullPath === '/' || fullPath === '/login') {
        } else {
          this.$router.push('/login')
        }
      })
  } catch (error) {
    commit('setUserMUT', null)
  }
}

export async function UserLogout ({ commit }, dataIn) {
  try {
    // Logout
    await axios.get('http://localhost:8080/logout')
    commit('setUserMUT', null)
    // ONLINE = false
    const user = dataIn
    user.online = false
    await axios.put(URL + user.id, user)
  } catch (error) {
    commit('setUserMUT', null)
  }
  this.$router.push('/')
}

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
