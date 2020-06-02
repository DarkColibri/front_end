import axios from 'axios'
const url = 'http://localhost:8080/api/categories/'

export async function getCategory ({ commit }, id) {
  // console.log('ACCTION - http://localhost:8080/api/threads/' + id)
  try {
    const response = await axios.get(url + id)
    const { data } = response.data
    // console.log('CATEGORIA = ' + JSON.stringify(data))
    commit('setCategoryMutation', data)
    // console.log(JSON.stringify(response.data))
    // commit('getCategoryMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getAllCategories ({ commit }) {
  // console.log('ACCTION getAllCategories - ' + url)
  try {
    const response = await axios.get(url)
    const { data } = response.data
    // console.log('CATEGORIAS = ' + JSON.stringify(data))
    commit('setAllCategoriesMutation', data)
    // console.log(response.data)
    // commit('getAllCategoriesMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getNameCategory ({ commit }, id) {
  // console.log('ACCTION getAllCategories - ' + url)
  try {
    // console.log('getNameCategory')
    const response = await axios.get(url + id)
    const { data } = response.data
    // console.log('NOMBRES DE LAS CATEGORIAS = ' + JSON.stringify(data))
    return data.name
    // console.log(JSON.stringify(response.data.name))
    // return response.data.name
  } catch (error) {
    console.error(error.data)
  }
}

export async function createCategory ({ commit }, body) {
  // console.log('ACCTION getAllCategories - ' + url)
  try {
    const response = await axios.post(url, body)
    // console.log(JSON.stringify(response.data))
  } catch (error) {
    console.error(error)
  }
}

export async function updateCategory ({ commit }, body) {
  // console.log('ACCTION updateCategory - ' + url)
  try {
    // console.log(body.id)
    // console.log(body)
    // UPDATE
    await axios.put(url + body.id, body)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteCategory ({ commit }, id) {
  try {
    await axios.delete(url + id)
  } catch (error) {
    console.error(error)
    return false
  }
}
