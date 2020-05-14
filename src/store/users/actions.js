
import axios from 'axios'
import { constants } from 'os'
const debug = require('debug')('src:store:USERS:actions')
const URL = 'http://localhost:8080/api/users/'

export async function getAllUsers ({ commit }) {
  try {
    debug('[GET ALL USERS] ' + URL)
    // GET ALL users
    const response = await axios.get(URL)
    debug('[USERS] ' + JSON.stringify(response.data))
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.error(error.data)
    commit('getAllUsersMUT', null)
  }
}

export async function getUser ({ commit }, user) {
  try {
    debug('[ACTION GET USER] ' + JSON.stringify(user))
    // GET user
    const response = await axios.get(URL + user.name + '/' + user.password)
    debug('[ACTION USER] ' + JSON.stringify(response.data))
    //
    commit('getUserMUT', response.data)
  } catch (error) {
    console.error(error.data)
    commit('getUserMUT', null)
  }
}

export async function createUser ({ commit }, dataIn) {
  try {
    debug('[CREATE USER] ' + JSON.stringify(dataIn))
    // POST new user
    // const instert = await axios.post(URL, dataIn)
    // const instert = await axios.post('http://localhost:8080/singup', dataIn)
    const instert = await axios.post(URL, dataIn)
    debug('[CREATED USER] ' + JSON.stringify(instert.data))
    // GET ALL users
    // const response = await axios.get(URL)
    // debug('[ACTION][USERS]' + JSON.stringify(response.data))
    commit('getUserMUT', instert.data)
  } catch (error) {
    console.error(error)
    commit('getUserMUT', null)
  }
}

export async function updateUser ({ commit }, dataIn, id) {
  try {
    debug('[UPDATE USER] ' + JSON.stringify(dataIn))
    const updated = await axios.put(URL + id, dataIn)
    //
    debug('[USER UPDATED] ' + JSON.stringify(updated.data))
    // GET ALL users
    const response = await axios.get(URL)
    // debug('[USERS]' + JSON.stringify(response.data))
    commit('getAllUsersMUT', response.data)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteUser ({ commit }, id) {
  try {
    debug('[DELETE USER] ' + id)
    const deleted = await axios.delete(URL + id)
    debug('[DELETE RESP] ' + deleted)
    // GET ALL users
    const response = await axios.get(URL)
    // debug('[ACTION][USERS]' + JSON.stringify(response.data))
    commit('getAllUsersMUT', response.data)

    return deleted
  } catch (error) {
    console.error(error)
  }
}

export async function login ({ commit }, user) {
  try {
    // debug('LOGIN: ' + JSON.stringify(user))
    console.log('LOGIN: ' + JSON.stringify(user))
    // GET user
    const response = await axios.post('http://localhost:8080/signin', user)
    // const userLoged = response.config.data
    console.log('Llamar al ACTION para crear USUARIO')
    console.log(response)
    // console.log(JSON.parse(response.config.data))
    // console.log('RESPOSE URL' + response.request.responseURL)
    console.log('?????????????????????????????????????????????????')
    //
    commit('getUserMUT', JSON.parse(response.config.data))
  } catch (error) {
    console.error(error.data)
    commit('getUserMUT', null)
  }
}
