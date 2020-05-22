import axios from 'axios'
const url = 'http://localhost:8080/api/associations/'

export async function getAssociation ({ commit }, id) {
  console.log('ACCTION getAssociation - ' + url)
  try {
    const response = await axios.get(url + id)
    // console.log(JSON.stringify(response.data))
    commit('getAssociationMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getAllAssociations ({ commit }) {
  console.log('ACCTION getAllAssociations - ' + url)
  try {
    const response = await axios.get(url)
    console.log(response.data)
    commit('getAllAssociationsMutation', response.data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getNameAssociation ({ commit }, id) {
  console.log('ACCTION getNameAssociation - ' + url)
  try {
    const response = await axios.get(url + id)
    // console.log(JSON.stringify(response.data.name))
    return response.data.name
  } catch (error) {
    console.error(error.data)
  }
}

export async function createAssociation ({ commit }, body) {
  console.log('ACCTION createAssociation - ' + url)
  try {
    // console.log('createAssociation')
    // console.log(body)
    const response = await axios.post(url, body)
    // console.log(JSON.stringify(response.data))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function updateAssociation ({ commit }, body) {
  console.log('ACCTION createAssociation - ' + url)
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

export async function deleteAssociation ({ commit }, id) {
  try {
    console.log('ACCTION deleteAssociation - ' + url + id)
    const response = await axios.delete(url + id)
    // console.log(JSON.stringify(response.data))
    console.log(response.data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getCategoriesFromAssociation ({ commit }, id) {
  console.log('ACCTION getCategoriesFromAssociation - ' + url)
  try {
    const response = await axios.get('http://localhost:8080/api/asocat/category/' + id)
    console.log(JSON.stringify(response.data))
    return response.data
  } catch (error) {
    console.error(error.data)
  }
}
