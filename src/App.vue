<template>
  <div id="q-app">
    <!-- Renderiza el ROUTER -->
    <router-view />
  </div>
</template>

<script >
// import Vuex from 'vuex'
export default {
  // Nombre Aplicacion
  name: 'App'
  // ,
  // methods: {
  //   ...Vuex.mapActions('users', ['UserLogin'])
  // },
  // mounted () {
  //   console.log('MOUNTED ' + this.$route.fullPath)
  //   this.UserLogin(this.$route.fullPath)
  // }
}
</script>
