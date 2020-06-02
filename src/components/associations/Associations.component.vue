<template>
  <div>
    Asociacion
    <q-list>
      <q-card class="bg-grey-3" flat bordered>
        <!-- CATEGORIAS -->
        <div class="row">
          <div v-for="category in categories"
            :key="category.id"
            class="col q-pa-md">- {{category.associationName}}</div>
        </div>
        <q-separator />
        <!-- NOMBRE y DESCRIPCION -->
        <q-card-section horizontal>
          <div class="q-pa-md">
            <div class="row text-h5 q-mt-sm q-mb-xs">{{name}}</div>
            <div class="row text-caption">{{description}}</div>
          </div>
        </q-card-section>
        <q-separator />
        <!-- VISITAR -->
        <q-item
          clickable
          tag="a"
          :href="link"
          target="blank">
          <q-card-section>
            Visitar
          </q-card-section>
        </q-item>
        <!-- BOTONES -->
        <div v-if="userLogin.roleId === 1">
          <q-separator />
          <div class="row">
            <div class="col">
              <q-btn @click="modifyAsso()" color="primary" flat>Modificar</q-btn>
            </div>
            <div class="col">
              <q-btn @click="deleteAsso()" color="primary" flat>Borrar</q-btn>
            </div>
          </div>
        </div>
      </q-card>
<!--  ======================================================================== -->
    </q-list>
  </div>
</template>

<script>
import Vuex from 'vuex'
const timeagoInstance = require('timeago.js')

export default {
  name: 'Associations',
  props: ['id', 'name', 'description', 'link'],
  data () {
    return {
      categories: null
    }
  },
  computed: {
    ...Vuex.mapState('users', ['userLogin'])
    // ...Vuex.mapState('associations', ['categories'])
  },
  methods: {
    ...Vuex.mapActions('categories', ['getNameCategory']),
    ...Vuex.mapActions('associations', ['getCategoriesFromAssociation', 'deleteAssociation']),
    modifyAsso () {
      console.log('MODIFICAMOS!!!!!!')
      this.$router.push('/associations/' + this.id)
    },
    deleteAsso () {
      this.deleteAssociation(this.id)
      this.$router.push('/associations')
    }
  },
  async created () {
    console.log('CREATED AssoComponent. Id = ' + this.id)
    this.categories = await this.getCategoriesFromAssociation(this.id)
    console.log('CREATED Categories = ' + JSON.stringify(this.categories))
    for (let j = 0; j < this.categories.length; j += 1) {
      // console.log(this.allCategories[j])
      this.categories[j].associationName = await this.getNameCategory(this.categories[j].categoryId)
      console.log(this.categories[j].associationName)
    }
    console.log('Categorias: ' + JSON.stringify(this.categories))
    console.log('EXIT!!!!  CREATED AssoComponent. Id = ' + this.id)
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
