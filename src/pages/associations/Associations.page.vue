<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn to="/associations/add" align="left" icon-right="forum" class="btn-fixed-width" color="primary" label="Crear" />
    <!-- <router-link :to="{ path:'/threads/add/' + thread.id, params: { id: 123 }}">Home</router-link> -->
    <!-- <router-link to="/threads/add/2">Register</router-link> -->
    <!-- <associations
      v-for="(association, index) in allAssociations "
        :key="index"
        :id="association.id"
        :description="association.description"
        :name="association.name"
        :link="association.link"/> -->

        <div v-for="association in allAssociations"
          :key="association.index">
          <q-card class="bg-grey-3" flat bordered>
            <!-- CATEGORIAS -->
            <div class="row">
              <div v-for="category in association.categories"
                :key="category.id"
                class="col q-pa-md">
                <q-list> -{{category.associationName}}</q-list>
                  </div>
            </div>
            <q-separator />
            <!-- NOMBRE y DESCRIPCION -->
            <q-item clickable tag="a" :href="association.link" target="blank">
              <q-card-section horizontal>
                <div class="q-pa-md">
                  <div class="row text-h5 q-mt-sm q-mb-xs">{{association.name}}</div>
                  <div class="row text-caption">{{association.description}}</div>
                </div>
              </q-card-section>
            </q-item>
            <q-separator />
            <!-- BOTONES -->
            <div v-if="userLogin.roleId === 1">
              <q-separator />
              <div class="row">
                <q-btn @click="modificar(association.id)" color="primary" flat>Modificar</q-btn>
                <q-btn @click="eliminar(association.id)" color="primary" flat>Borrar</q-btn>
              </div>
            </div>

          </q-card>
        </div>

  </div>
</template>

<script>
import Vuex from 'vuex'
// import Associations from '../../components/associations/Associations.component'
// import AddAssociations from '../../components/associations/Associations.Add.component'

export default {
  // components: {
  //   associations: Associations
  // },
  computed: {
    ...Vuex.mapState('users', ['userLogin']),
    ...Vuex.mapState('associations', ['allAssociations'])
  },
  methods: {
    ...Vuex.mapActions('associations', ['getAllAssociations', 'deleteAssociation', 'getCategoriesFromAssociation']),
    ...Vuex.mapActions('categories', ['getNameCategory']),
    modificar (id) {
      this.$router.push('/associations/' + id)
    },
    eliminar (id) {
      this.deleteAssociation(id)
    }
  },
  async created () {
    try {
      // console.log('CREATED ASSOCIATIONS.')
      await this.getAllAssociations()
      // console.log('CREATED getAllAssociations.' + JSON.stringify(this.allAssociations))
      // ASSOCIATIONS
      for (let i = 0; i < this.allAssociations.length; i += 1) {
        // console.log('CREATED Categorias de ' + this.allAssociations[i].name)
        this.allAssociations[i].categories = await this.getCategoriesFromAssociation(this.allAssociations[i].id)
        // CATEGORIES
        // console.log(this.allAssociations[i].categories)
        for (let j = 0; j < this.allAssociations[i].categories.length; j += 1) {
          this.allAssociations[i].categories[j].associationName = await this.getNameCategory(this.allAssociations[i].categories[j].categoryId)
        }
      }

      // console.log('CREATED ASSOCIATIONS WITH CATEGORIES:')
      // console.log(this.allAssociations)
    } catch (error) {
      console.log(error)
      console.log('CREATED Associations. Salimos KO.')
    }
    // console.log('CREATED Associations [ESTO SIEMPRE SALE]')
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
