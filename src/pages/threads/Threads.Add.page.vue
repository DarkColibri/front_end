<template>
  <div class="q-pa-md bg-grey-3" >
  <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md">
    <!-- <q-form
      :action="tab=='login' ? '/signin' : '/signup'"
      method="POST"
      class="q-gutter-md"> -->
    <!-- <form action="/signin" method="POST"> -->

      <q-input v-model="thread.subject"
        name="subject"
        class="q-mb-md"
        filled
        type="subject"
        label="Asunto"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
      </q-input>

      <q-input v-model="thread.description"
        name="description"
        class="q-mb-md"
        filled
        type="textarea"
        label="Descripción"/>

      <q-select v-model="thread.categoryId"
        :options="options"
        label="Categoría"
        filled
        emit-value
        map-options/>
<!--
      <q-input v-model="thread.userId"
        label="Usuario"
        name="userId"
        class="q-mb-md"
        filled
        type="text"
        disable/> -->
      <!-- BOTONES -->
      <div class="row">
        <q-space/>
        <q-btn label="Enviar" name="submit" type="submit" color="primary" class="q-ml-sm"/>
        <q-btn label="Reset" name="Reset" type="reset" color="primary" class="q-ml-sm"/>
      </div>
    </q-form>
  </div>

  <!-- </form> -->
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import { map } from 'bluebird'
// const debug = require('debug')('src:components:authentication:LoginComponent')

export default {
  // name: 'addThread',
  // props: ['id', 'description', 'subject', 'categoryId', 'userId', 'replies', 'createdAt'],
  data () {
    return {
      thread: {
        id: '',
        description: '',
        subject: '',
        categoryId: 0,
        userId: 0,
        replies: 0,
        visits: 0
      },
      options: []
    }
  },
  computed: {
    ...mapState('users', ['userLogin']),
    ...mapState('categories', ['allCategories']),
    ...mapState('threads', ['threadState'])
  },
  methods: {
    ...mapActions('categories', ['getAllCategories']),
    ...mapActions('users', ['getNameUser']),
    ...mapActions('threads', ['createThread', 'getThread', 'updateThread']),

    async onSubmit () {
      console.log('Enviamos Foro: ' + JSON.stringify(this.thread))
      if (this.$route.params.id === '0') {
        const result = await this.createThread(this.thread)
      } else {
        const result = await this.updateThread(this.thread)
      }
      console.log('Finish')
      this.$router.push('/threads')
    },
    onReset () {
      console.log('On RESET!!')
    }
  },
  async mounted () {
    console.log('oooooooooooooooooooo')
    console.log(this.$route.params.id)
    if (this.$route.params.id !== '0') {
      console.log('Creamos!!')
      await this.getThread(this.$route.params.id)
      console.log(JSON.stringify(this.threadState))
      this.thread.id = this.threadState.id
      this.thread.description = this.threadState.description
      this.thread.subject = this.threadState.subject
      this.thread.categoryId = this.threadState.categoryId
      this.thread.userId = this.threadState.userId
      this.thread.replies = this.threadState.replies
      this.thread.visits = this.threadState.visits
    }
    await this.getAllCategories()
    // console.log(this.allCategories)
    for (let j = 0; j < this.allCategories.length; j += 1) {
      // console.log(this.allCategories[j])
      const insert = this.options.push(this.allCategories[j]) - 1
      // console.log(insert)
      this.options[insert].label = this.allCategories[j].name
      this.options[insert].value = this.allCategories[j].id
    }
    // console.log(this.options)
    // this.options = this.allCategories
    this.thread.userId = this.userLogin.id
    // console.log('oooooooooooooooooooo')
  }
}
</script>

<style>

</style>
