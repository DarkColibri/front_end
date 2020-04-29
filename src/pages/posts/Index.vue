<template>
  <div class="q-pa-md q-gutter-sm">
  <router-link :to="'/threads/'">
    <q-chip size="25px" icon="bookmark">
      {{threadState.subject}}
    </q-chip>
  </router-link>
    <q-card class="row" flat bordered v-for="(post, index) in postsState" :key="index">
      <q-card-section class="col" v-html="post.content"/>
      <q-btn @click="eliminar(post.id)" color="red" icon="delete"></q-btn>
    </q-card>

    <div class="flex flex-center" v-if="postsState.length == 0">
      <h6>Sin notas.</h6>
    </div>

    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Guardar Comentario',
          icon: 'save',
          label: 'GUARDAR',
          handler: saveWork
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']]"/>
  </div>
</template>

<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      editor: '',
      tasks: [],
      post: {
        content: '',
        threadId: this.$route.params.id,
        userId: 2,
        votesUp: 0,
        votesDown: 0,
        postRefId: null
      }
    }
  },
  computed: {
    ...Vuex.mapState('posts', ['postsState']),
    ...Vuex.mapState('threads', ['threadState'])
  },
  methods: {
    ...Vuex.mapActions('posts', ['getAllPosts', 'postPosts', 'deletePost']),
    ...Vuex.mapActions('threads', ['getThread']),
    // EDITOR
    saveWork () {
      this.post.content = this.editor
      console.log('SAVING: ' + JSON.stringify(this.post))
      this.postPosts(this.post)
        .then(response => {
          console.log('SE HA GUARDADO: ' + JSON.stringify(response.data))
          // this.getAllPosts(this.$route.params.id)
        })
      this.$q.notify({
        message: 'Mensaje guardado.',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    uploadIt () {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      })
    },
    eliminar (index) {
      this.$q.dialog({
        title: 'Atención!',
        message: '¿Está seguro de que quiere borrar el comentario [' + index + ']',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        // DELETE
        const deleted = await this.deletePost(index)
        console.log('DELETED: ' + deleted)
        // RELOAD
        await this.getAllPosts(this.$route.params.id)
      })
    }
  },
  async created () {
    try {
      // console.log('POST CREATED ')
      await this.getAllPosts(this.$route.params.id)
      await this.getThread(this.$route.params.id)
      // console.log('Todo creado!!!!!!')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>
  .tachar{
    text-decoration: line-through;
  }
</style>
