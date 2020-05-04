const debug = require('debug')('web:src:store:action:users')
import axios from 'axios'

const URL = 'http://localhost:8080/api/users/'

export async function getAllUser ({ commit }) {
  try {
    debug('[GET ALL USERS]')
    // GET ALL users
    const response = await axios.get(URL)
    debug('[USERS] ' + JSON.stringify(response.data) + '\n')
    //
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.error(error.data)
    commit('getAllUsersMUT', null)
  }
}

export async function getUser ({ commit }, id) {
  try {
    debug('[GET USER] ' + id + '\n')
    // GET user
    const response = await axios.get(URL + id)
    debug('[USER] ' + JSON.stringify(response.data) + '\n')
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
    debug('[CREATE USER] ' + JSON.stringify(dataIn) + '\n')
    // POST new user
    const instert = await axios.post(URL, dataIn)
    debug('[CREATED USER] ' + JSON.stringify(instert.data) + '\n')
    // GET ALL users
    const response = await axios.get(URL)
    // debug('[ACTION][USERS]' + JSON.stringify(response.data) + '\n')
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.log(error)
    commit('getAllUsersMUT', null)
  }
}

export async function updateUser ({ commit }, dataIn, id) {
  try {
    debug('[UPDATE USER] ' + JSON.stringify(dataIn) + '\n')
    //
    const updated = await axios.put(URL + id, dataIn)
    //
    debug('[UPDATED] ' + JSON.stringify(updated.data))
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
    debug('[DELETE USER] ' + id + '\n')
    const deleted = await axios.delete(URL + id)
    debug('[DELETE RESP] ' + deleted + '\n')
    // GET ALL users
    const response = await axios.get(URL)
    // debug('[ACTION][USERS]' + JSON.stringify(response.data) + '\n')
    commit('getAllUsersMUT', response.data)

    return deleted
  } catch (error) {
    console.log(error)
  }
}
