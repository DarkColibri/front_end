<template>
  <div class="q-pa-md q-gutter-sm">
    <h4>profile</h4>
    <div class="card text-center">
      <div v-if="userLogin != null" class="card-body">
          <h3>Welcome {{userLogin.name}}</h3>
          <h4>{{userLogin.email}}</h4>
          <a href="/links" class="btn btn-primary m-4">
              Save your Links
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      editor: ''
    }
  },
  computed: {
    // ...Vuex.mapState('users', ['userLogin'])
    ...Vuex.mapState('users', ['userLogin'])
  },
  methods: {
    // ...Vuex.mapActions('users', ['UserLogin'])
  },
  created () {
    console.log('Profile created()')
    console.log(this.userLogin)
  },
  mounted () {
    console.log('Profile Mounted .................')
    console.log(this.userLogin)
    console.log('Profile Mounted .................')
  },
  beforeUpdate () {
    console.log('Profile beforeUpdate .................')
    console.log(this.userLogin)
    console.log('Profile beforeUpdate .................')
  },
  updated () {
    console.log('Profile updated .................')
    console.log(this.userLogin)
    console.log('v updated .................')
  }
  // async created () {
  //   try {
  //     console.log('CREATE PROFILE PAGE.')
  //     await this.getUserLogin()
  //     // if (this.userLogin === null) this.$router.push('/login')
  //     console.log('PAGE PROFILE LOADED')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
</script>

<style>
  .tachar{
    text-decoration: line-through;
  }
</style>
