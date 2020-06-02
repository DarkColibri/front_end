import axios from 'axios'

const URL = 'http://localhost:8080/api/posts'

export async function getAllPosts ({ commit }, id) {
  console.log('ACTION GET ALL POSTS ' + id)
  try {
    const response = await axios.get(URL + '/threads/' + id)
    const { data } = response.data
    console.log('POSTS = ' + JSON.stringify(data))
    commit('getAllPostsMutation', data)

    // console.log('[API RESPONSE]' + JSON.stringify(response.data))
    // commit('getAllPostsMutation', response.data)
  } catch (error) {
    console.log(error)
  }
}
//  createPost
export async function postPosts ({ commit }, dataIn) {
  // console.log('ACCTION - POST http://localhost:8080/api/posts/')
  try {
    console.log('POST POSTS: ' + JSON.stringify(dataIn))
    // POST
    // const instert = await axios({
    //   method: 'post',
    //   url: 'http://localhost:8080/api/posts/',
    //   data: dataIn
    // })
    const instert = await axios.post('http://localhost:8080/api/posts/', dataIn)

    // console.log('[AXIOS RESPONSE]' + JSON.stringify(instert.data))
    const response = await axios.get('http://localhost:8080/api/posts/threads/' + dataIn.threadId)
    const { data } = response.data
    console.log('POSTS = ' + JSON.stringify(data))
    commit('getAllPostsMutation', data)

    // commit('getAllPostsMutation', response.data)
    // console.log('[AXIOS RESPONSE]' + JSON.stringify(response.data))
    return response
    // commit('getAllPostsMutation', response.data)
  } catch (error) {
    console.log(error)
  }
}

export async function deletePost ({ commit }, postId) {
  console.log('DELETE http://localhost:8080/api/posts/' + postId)
  try {
    const deleted = await axios.delete('http://localhost:8080/api/posts/' + postId)
    console.log('[AXIOS RESPONSE]')
    console.log(deleted)
    commit('nullMutation')
    return deleted
  } catch (error) {
    console.log(error)
  }
}
