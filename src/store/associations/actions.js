import axios from 'axios'
const url = 'http://localhost:8080/api/associations/'
const urlAssocat = 'http://localhost:8080/api/assocat/'
const urlcat = 'http://localhost:8080/api/categories/'

async function getAllCategories (association) {
  association.categories = []
  association.listCatNames = null
  // ASSOCAT
  const assocatResp = await axios.get(urlAssocat + 'categories/' + association.id)
  const { data } = assocatResp.data
  const assocat = data
  // CATEGORIAS
  for (let j = 0; j < assocat.length; j += 1) {
    const categoriesResp = await axios.get(urlcat + assocat[j].categoryId)
    const { data } = categoriesResp.data
    const cat = data
    association.categories.push(cat)
    if (j === 0) {
      association.listCatNames = cat.name
    } else if (j < assocat.length) {
      association.listCatNames += ', ' + cat.name
    } else {
      association.listCatNames += cat.name
    }
  }
}

export async function getAllAssociations ({ commit }) {
  // console.log('ACCTION getAllAssociations - ' + url)
  try {
    // ASOCIACIONES
    const response = await axios.get(url)
    const { data } = response.data
    const associations = data
    // CATEGORIES
    for (let i = 0; i < associations.length; i += 1) {
      await getAllCategories(associations[i])
    }
    // SAVE
    commit('setAllAssociationsMutation', associations)
  } catch (error) {
    console.error(error.data)
  }
}

export async function getAssociation ({ commit }, id) {
  console.log('ACCTION getAssociation - ' + url + id)
  try {
    // ASSOCIATION
    const response = await axios.get(url + id)
    const { data } = response.data
    // CATEGORIAS
    await getAllCategories(data)

    // console.log(data)
    commit('setAssociationMutation', data)
  } catch (error) {
    console.error(error.data)
  }
}

export async function createAssociation ({ commit }, body) {
  // console.log('createAssociation - ' + url)
  // console.log(body)
  try {
    // CREATE ASSOCIATION
    const response = await axios.post(url, body)
    const { data } = response.data

    for (let j = 0; j < body.categories.length; j += 1) {
      const category = {}
      category.categoryId = body.categories[j]
      category.associationId = data.id
      // CREATE ASSOCAST
      axios.post(urlAssocat, category)
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteAssociation ({ commit }, id) {
  try {
    // console.log('ACCTION deleteAssociation - ' + url + id)
    await axios.delete(url + id)
    await axios.delete(urlAssocat + 'asso/' + id)
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function updateAssociation ({ commit }, body) {
  console.log('ACCTION updateAssociation - ' + url)
  try {
    // console.log(body.id)
    // console.log(body)
    // UPDATE
    const response = await axios.put(url + body.id, body)
    const { data } = response.data
    // DELETE ALL CATEGORIES
    const deleted = await axios.delete(urlAssocat + 'categories/' + body.id)
    console.log(deleted)

    for (let j = 0; j < body.categories.length; j += 1) {
      const category = {}
      category.categoryId = body.categories[j]
      category.associationId = body.id
      // CREATE ASSOCAST
      axios.post(urlAssocat, category)
    }
  } catch (error) {
    console.error(error)
  }
}

// ---------------------------------------------------------------------------------------

export async function getNameAssociation ({ commit }, id) {
  console.log('ACCTION getNameAssociation - ' + url)
  try {
    const response = await axios.get(url + id)
    const { data } = response.data
    console.log('ASOCIACIONES = ' + JSON.stringify(data))

    // console.log(JSON.stringify(response.data.name))
    return data.name
  } catch (error) {
    console.error(error.data)
  }
}

export async function createCategories ({ commit }, body) {
  console.log('ACCTION createCategories - ' + url)
  console.log(body)
  try {
    const response = await axios.post('http://localhost:8080/api/assocat/category/', body)
    console.log('ACCTION Request createCategoriesFromAssociation' + JSON.stringify(response.data))
    // commit('getAllCategoriesMutation', response.data)
    return response.data
  } catch (error) {
    console.error(error.data)
  }
}

export async function getCategoriesFromAssociation ({ commit }, id) {
  console.log('ACCTION getCategoriesFromAssociation - ' + url)
  try {
    const response = await axios.get('http://localhost:8080/api/assocat/categories/' + id)
    console.log('ACCTION Request getCategoriesFromAssociation' + JSON.stringify(response.data))
    // commit('getAllCategoriesMutation', response.data)
    return response.data
  } catch (error) {
    console.error(error.data)
  }
}
