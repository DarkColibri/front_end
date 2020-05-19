import axios from 'axios'

export async function getCategory ({ commit }, id) {
  // console.log('ACCTION - http://localhost:8080/api/threads/' + id)
  try {
    const response = await axios.get('http://localhost:8080/api/categories' + id)
    // console.log(JSON.stringify(response.data))
    commit('getCategoryMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getAllCategories ({ commit }) {
  // console.log('ACCTION - http://localhost:8080/api/threads/')
  try {
    const response = await axios.get('http://localhost:8080/api/categories')
    // console.log(JSON.stringify(response.data))
    commit('getAllCategoriesMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getNameCategory ({ commit }, id) {
  // console.log('ACCTION - http://localhost:8080/api/threads/')
  try {
    console.log('getNameCategory')
    const response = await axios.get('http://localhost:8080/api/categories/' + id)
    console.log(JSON.stringify(response.data.name))
    return response.data.name
  } catch (error) {
    console.error(error.data)
  }
}
