
// El DEBUG aquí no funciona.

import axios from 'axios'
const URL = 'http://localhost:8080/api/users/'

export async function getAllUsers ({ commit }) {
  try {
    console.log('[GET ALL USERS] ' + URL)
    // GET ALL users
    const response = await axios.get(URL)
    console.log('[USERS] ' + JSON.stringify(response.data))
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.error(error.data)
    commit('getAllUsersMUT', null)
  }
}

export async function getUser ({ commit }, user) {
  try {
    console.log('[ACTION GET USER] ' + JSON.stringify(user))
    // GET user
    const response = await axios.get(URL + user.name + '/' + user.password)
    console.log('[ACTION USER] ' + JSON.stringify(response.data))
    //
    commit('getUserMUT', response.data)
  } catch (error) {
    console.error(error.data)
    commit('getUserMUT', null)
  }
}

export async function createUser ({ commit }, dataIn) {
  try {
    console.log('[CREATE USER] ' + JSON.stringify(dataIn))
    // POST new user
    // const instert = await axios.post(URL, dataIn)
    // const instert = await axios.post('http://localhost:8080/singup', dataIn)
    const instert = await axios.post(URL, dataIn)
    console.log('[CREATED USER] ' + JSON.stringify(instert.data))
    // GET ALL users
    // const response = await axios.get(URL)
    // console.log('[ACTION][USERS]' + JSON.stringify(response.data))
    commit('getUserMUT', instert.data)
  } catch (error) {
    console.error(error)
    commit('getUserMUT', null)
  }
}

export async function updateUser ({ commit }, dataIn, id) {
  try {
    console.log('[UPDATE USER] ' + JSON.stringify(dataIn))
    const updated = await axios.put(URL + id, dataIn)
    //
    console.log('[USER UPDATED] ' + JSON.stringify(updated.data))
    // GET ALL users
    const response = await axios.get(URL)
    // console.log('[USERS]' + JSON.stringify(response.data))
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteUser ({ commit }, id) {
  try {
    console.log('[DELETE USER] ' + id)
    const deleted = await axios.delete(URL + id)
    console.log('[DELETE RESP] ' + deleted)
    // GET ALL users
    const response = await axios.get(URL)
    // console.log('[ACTION][USERS]' + JSON.stringify(response.data))
    commit('getAllUsersMUT', response.data)

    return deleted
  } catch (error) {
    console.error(error)
  }
}

// UTILIZAR USUARIO_LOGUEADO
export async function UserLogin ({ commit }, fullPath) {
  try {
    // console.log('LOGIN: ' + JSON.stringify(user))
    // console.log('Comprobando path ' + fullPath)
    console.log('ACTINON LOGIN ' + fullPath)
    // GET user
    // const response = await axios.get('http://localhost:8080/api/users/getUserLogin')
    await axios.get('http://localhost:8080/api/users/getUserLogin')
      .then(response => {
        console.log(response.data)
        commit('getUserMUT', response.data)
        console.log('1 - Despues del commit.')
        // return response.data
        if (fullPath === '/login') {
          this.$router.push('/profile')
        }
      })
      .catch(err => {
        console.error('Error al autenticar.' + err)
        commit('getUserMUT', null)
        console.error('2 - Despues del commit. Realizamos return null.')
        if (fullPath === '/' || fullPath === '/login') {
          console.log('1 - Go to ... ' + fullPath)
          // this.$router.push(fullPath)
          // } else if (fullPath === '/login') {
          console.log('2 - Go to ...  ' + fullPath)
        } else {
          this.$router.push('/login')
        }
      })
    console.log('Salimos del Action.')
    // this.$router.push(fullPath)
    // commit('getUserMUT', null)
  } catch (error) {
    console.error('ERROR en ' + fullPath)
    commit('getUserMUT', null)
    console.error('3 - Despues del commit. Realizamos return null')
    // return null
  }
}

export async function UserLogout ({ commit }) {
  try {
    // console.log('LOGIN: ' + JSON.stringify(user))
    console.log('UserLogout')
    const response = await axios.get('http://localhost:8080/logout')
    console.log('Logout ... [OK]')
    commit('getUserMUT', null)
  } catch (error) {
    console.error(error.data)
    commit('getUserMUT', null)
  }

  console.log('Vamos ha hacer el router.push()')
  this.$router.push('/')
}

export async function getNameUser ({ commit }, id) {
  // console.log('ACCTION - http://localhost:8080/api/threads/')
  try {
    console.log('getNameUser∫')
    const response = await axios.get(URL + id)
    console.log(JSON.stringify(response.data.name))
    return response.data.name
  } catch (error) {
    console.error(error.data)
  }
}
