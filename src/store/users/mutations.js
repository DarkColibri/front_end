const debug = require('debug')('src:store:USERS:mutations')
import Vue from 'vue'

export function setUserMUT (state, data) {
  state.userLogin = data
  // debug('MUTATIONS GET USER')
  // console.log('commit "setUserMut" => userLogin :' + JSON.stringify(state.userLogin))
}

export function setAllUsersMUT (state, data) {
  state.allUsers = data
  // console.log('commit "setUsersMUT" => setAllUsers : ' + JSON.stringify(state.allUsers))
}
