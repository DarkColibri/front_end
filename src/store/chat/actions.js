import axios from 'axios'

const URL = 'http://localhost:8080/api/messages/'
const urluser = 'http://localhost:8080/api/users/'

export async function getMessages ({ commit }, data) {
  const id = data.id
  const id2 = data.id2

  try {
    const response = await axios.get(URL + id + '/' + id2)
    const { data } = response.data
    const messages = data
    // console.log(data)
    // USUARIO
    for (let j = 0; j < messages.length; j += 1) {
      const user = await axios.get(urluser + messages[j].from)
      const { data } = user.data
      // console.log(data)
      messages[j].name = data.name
    }
    commit('setMessages', data)
  } catch (error) {
    console.error(error)
  }
}
//  createPost
export async function setMessage ({ commit, dispatch }, dataIn) {
  try {
    console.log(dataIn)
    // INSERT
    await axios.post(URL, dataIn)
    dispatch('getMessages', { id: this.dataIn.from, id2: this.dataIn.to })
  } catch (error) {
    console.log(error)
  }
}

// export async function deletePost ({ commit }, postId) {
//   console.log('DELETE http://localhost:8080/api/posts/' + postId)
//   try {
//     const deleted = await axios.delete('http://localhost:8080/api/posts/' + postId)
//     console.log('[AXIOS RESPONSE]')
//     console.log(deleted)
//     commit('nullMutation')
//     return deleted
//   } catch (error) {
//     console.log(error)
//   }
// }
