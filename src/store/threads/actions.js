import axios from 'axios'
const url = 'http://localhost:8080/api/threads/'

export async function getThread ({ commit }, id) {
  // console.log( + id)
  try {
    const response = await axios.get(url + id)
    // console.log(JSON.stringify(response.data))
    commit('getThreadMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getAllThreads ({ commit }) {
  // console.log('ACCTION - http://localhost:8080/api/threads/')
  try {
    const response = await axios.get(url)
    // console.log(JSON.stringify(response.data))
    commit('getAllThreadMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function createThread ({ commit }, body) {
  console.log('ACCTION createThread - ' + url)
  try {
    console.log('createThread')
    console.log(body)
    const response = await axios.post(url, body)
    // console.log(JSON.stringify(response.data))
    console.log(response.data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function updateThread ({ commit }, body) {
  console.log('ACCTION createThread - ' + url)
  try {
    console.log(body.id)
    console.log(body)
    const response = await axios.put(url + body.id, body)
    // console.log(JSON.stringify(response.data))
    console.log(response.data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function deleteThread ({ commit }, id) {
  try {
    console.log('ACCTION deleteThread - ' + url + id)
    const response = await axios.delete(url + id)
    // console.log(JSON.stringify(response.data))
    console.log(response.data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
