import axios from 'axios'
const url = 'http://localhost:8080/api/categories/'

export async function getCategory ({ commit }, id) {
  // console.log('ACCTION - http://localhost:8080/api/threads/' + id)
  try {
    const response = await axios.get(url + id)
    // console.log(JSON.stringify(response.data))
    commit('getCategoryMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getAllCategories ({ commit }) {
  // console.log('ACCTION getAllCategories - ' + url)
  try {
    const response = await axios.get(url)
    // console.log(response.data)
    commit('getAllCategoriesMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getNameCategory ({ commit }, id) {
  // console.log('ACCTION getAllCategories - ' + url)
  try {
    // console.log('getNameCategory')
    const response = await axios.get(url + id)
    // console.log(JSON.stringify(response.data.name))
    return response.data.name
  } catch (error) {
    console.error(error.data)
  }
}

export async function createCategory ({ commit }, body) {
  // console.log('ACCTION getAllCategories - ' + url)
  try {
    // console.log('createCategory')
    // console.log(body)
    const response = await axios.post(url, body)
    // console.log(JSON.stringify(response.data))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
