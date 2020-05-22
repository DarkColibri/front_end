<template>
  <div>
    Asociacion
    <q-list>
      <q-card class="bg-grey-3" flat bordered>
        <!-- CATEGORIAS -->
        <div class="row">
          <div v-for="category in categories"
            :key="category.id"
            class="col q-pa-md">-{{category.associationName}}</div>
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
              <q-btn @click="modificar()" color="primary" flat>Modificar</q-btn>
            </div>
            <div class="col">
              <q-btn @click="eliminar()" color="primary" flat>Borrar</q-btn>
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
  computed: {
    ...Vuex.mapState('users', ['userLogin'])
  },
  data () {
    return {
      user: '',
      categories: []
    }
  },
  methods: {
    ...Vuex.mapActions('categories', ['getNameCategory']),
    ...Vuex.mapActions('associations', ['getCategoriesFromAssociation']),
    modificar () {
      console.log('MODIFICAMOS!!!!!!')
      this.$router.push('/associations/' + this.id)
      console.log('modificado de')
    }
  },
  async created () {
    this.categories = await this.getCategoriesFromAssociation(this.id)
    for (let j = 0; j < this.categories.length; j += 1) {
      // console.log(this.allCategoriesState[j])
      this.categories[j].associationName = await this.getNameCategory(this.categories[j].categoryId)
      console.log(this.categories[j].associationName)
    }
    console.log('Categorias: ' + JSON.stringify(this.categories))
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
