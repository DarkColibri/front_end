
import axios from 'axios'

const URL = 'http://localhost:8080/api/users/'

export async function getAllUsers ({ commit }) {
  try {
    console.log('[GET ALL USERS] ' + URL)
    // GET ALL users
    const response = await axios.get(URL)
    console.log('[USERS] ' + JSON.stringify(response.data) + '\n')
    //
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.error(error.data)
    commit('getAllUsersMUT', null)
  }
}

export async function getUser ({ commit }, user) {
  try {
    console.log('[ACTION GET USER] ' + JSON.stringify(user) + '\n')
    // GET user
    const response = await axios.get(URL + user.name + '/' + user.password)
    console.log('[ACTION USER] ' + JSON.stringify(response.data) + '\n')
    //
    commit('getUserMUT', response.data)
    //
  } catch (error) {
    console.error(error.data)
    commit('getUserMUT', null)
  }
}

export async function createUser ({ commit }, dataIn) {
  try {
    console.log('[CREATE USER] ' + JSON.stringify(dataIn) + '\n')
    // POST new user
    const instert = await axios.post(URL, dataIn)
    console.log('[CREATED USER] ' + JSON.stringify(instert.data) + '\n')
    // GET ALL users
    // const response = await axios.get(URL)
    // debug('[ACTION][USERS]' + JSON.stringify(response.data) + '\n')
    commit('getUserMUT', instert.data)
  } catch (error) {
    console.log(error)
    commit('getUserMUT', null)
  }
}

export async function updateUser ({ commit }, dataIn, id) {
  try {
    console.log('[UPDATE USER] ' + JSON.stringify(dataIn) + '\n')
    const updated = await axios.put(URL + id, dataIn)
    //
    console.log('[USER UPDATED] ' + JSON.stringify(updated.data) + '\n')
    // GET ALL users
    const response = await axios.get(URL)
    // debug('[USERS]' + JSON.stringify(response.data) + '\n')
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.log(error)
  }
}

export async function deleteUser ({ commit }, id) {
  try {
    console.log('[DELETE USER] ' + id + '\n')
    const deleted = await axios.delete(URL + id)
    console.log('[DELETE RESP] ' + deleted + '\n')
    // GET ALL users
    const response = await axios.get(URL)
    // debug('[ACTION][USERS]' + JSON.stringify(response.data) + '\n')
    commit('getAllUsersMUT', response.data)

    return deleted
  } catch (error) {
    console.log(error)
  }
}
