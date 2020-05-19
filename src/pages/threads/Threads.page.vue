<template>
  <div class="q-pa-md q-gutter-sm">
  <q-chip size="25px" icon="bookmark">
  Temas
  </q-chip>
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
      console.log('CREATED THREADS')
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
