import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

// import example from './module-example'
// import exampleState from './module-example/state'
import associations from './associations'
import categories from './categories'
import threads from './threads'
import posts from './posts'
import users from './users'
import chat from './chat'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StoreInterface {
  // Define your own store structure, using submodules if needed
  // example: typeof exampleState;
  example: unknown;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      associations,
      categories,
      threads,
      posts,
      users,
      chat
    },
    state: {
      tituto: 'Ingeniero Informático'
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  })

  return Store
})
