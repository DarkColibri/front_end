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

      <q-input v-model="form.name"
        name="name"
        class="q-mb-md"
        filled
        type="name"
        label="Nombre"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
      </q-input>

      <q-input v-model="form.description"
        name="description"
        class="q-mb-md"
        filled
        type="textarea"
        label="Descripción"/>

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
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState('users', ['userLogin']),
    ...mapState('categories', ['category'])
  },
  methods: {
    ...mapActions('categories', ['getCategory', 'createCategory', 'updateCategory']),

    async onSubmit () {
      if (this.$route.fullPath.includes('/add')) {
        await this.createCategory(this.form)
      } else {
        await this.updateCategory(this.form)
      }
      // console.log('Finish')
      this.$router.push('/categories')
    },
    onReset () {
      console.log('RESET!!')
    }
  },
  async created () {
    const currentPath = this.$route.fullPath

    if (!currentPath.includes('/add')) {
      await this.getCategory(this.$route.params.id)
      this.form.id = this.category.id
      this.form.name = this.category.name
      this.form.description = this.category.description
    }
  }
}
</script>

<style>

</style>
