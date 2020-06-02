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

      <q-input v-model="form.link"
        name="link"
        class="q-mb-md"
        filled
        type="link"
        label="Link"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
      </q-input>

      <q-input v-model="form.description"
        name="description"
        class="q-mb-md"
        filled
        type="textarea"
        label="Descripción"/>

        <q-select
          filled
          v-model="model"
          multiple
          :options="allCategories"
          :option-label="getLabel"
          :option-value="getValue"
          map-options
          emit-value
          use-chips
          stack-label
          counter
          hint="With counter"/>

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
      model: [],
      model2: null,
      form: {
        id: '',
        name: '',
        description: '',
        link: '',
        categories: []
      },
      options: [],
      categories: []
    }
  },
  computed: {
    ...mapState('users', ['userLogin']),
    ...mapState('categories', ['allCategories']),
    ...mapState('associations', ['association'])
  },
  methods: {
    ...mapActions('categories', ['getAllCategories']),
    ...mapActions('associations', ['createAssociation', 'createCategories', 'getAssociation', 'updateAssociation']),

    getLabel (option) {
      return option.name
    },
    getValue (option) {
      return option.id
    },
    async onSubmit () {
      // console.log('Enviamos Foro: ' + JSON.stringify(this.thread))
      // console.log(this.model)
      this.form.categories = this.model
      if (this.$route.fullPath.includes('/add')) {
        await this.createAssociation(this.form)
      } else {
        await this.updateAssociation(this.form)
      }
      // console.log('Finish')
      this.$router.push('/associations')
    },
    onReset () {
      console.log(this.model)
    }
  },
  async created () {
    const currentPath = this.$route.fullPath

    if (!currentPath.includes('/add')) {
      // console.log('MODIFICAMOS id = ' + this.$route.params.id)

      await this.getAssociation(this.$route.params.id)
      this.form.id = this.association.id
      this.form.name = this.association.name
      this.form.description = this.association.description
      this.form.link = this.association.link
      // console.log(this.association)
      // CATEGORIES
      for (let i = 0; i < this.association.categories.length; i += 1) {
        // console.log(this.association.categories[i].name)
        this.model.push(this.association.categories[i].id)
      }
    }

    await this.getAllCategories()
  }
}
</script>

<style>

</style>
