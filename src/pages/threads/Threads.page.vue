<template>
  <div class="q-pa-md q-gutter-sm">
  <q-btn to="threads/add/0" align="left" icon-right="forum" class="btn-fixed-width" color="primary" label="Crear" />
  <!-- <router-link :to="{ path:'/threads/add/' + thread.id, params: { id: 123 }}">Home</router-link> -->
  <!-- <router-link to="/threads/add/2">Register</router-link> -->
  <thread
    v-for="(thread, index) in allThreadsState "
      :key="index"
      :id="thread.id"
      :description="thread.description"
      :subject="thread.subject"
      :categoryId="thread.categoryId"
      :userId="thread.userId"
      :replies="thread.replies"
      :createdAt="thread.createdAt"/>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Thread from '../../components/threads/Thread.component'

export default {
  components: {
    Thread
  },
  computed: {
    // Como el namespace está activado...
    // maspState('Nombre del modules', ['Nombre del State'])
    ...Vuex.mapState('threads', ['allThreadsState'])
  },
  methods: {
    ...Vuex.mapActions('threads', ['getAllThreads'])
    // ...mapMutations('threads', ['aumentarContador'])
  },
  created () {
    try {
      // console.log('CREATED THREADS')
      this.getAllThreads()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.div{
  background-color: grey;
}
  .tachar{
    text-decoration: line-through;
  }
</style>
