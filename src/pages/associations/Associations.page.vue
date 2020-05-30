<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn to="/associations/add" align="left" icon-right="forum" class="btn-fixed-width" color="primary" label="Crear" />
    <!-- <router-link :to="{ path:'/threads/add/' + thread.id, params: { id: 123 }}">Home</router-link> -->
    <!-- <router-link to="/threads/add/2">Register</router-link> -->
    <div v-for="association in allAssociations"
      :key="association.index">
      <q-card class="bg-grey-3" flat bordered>
        <!-- CATEGORIAS -->
        <div class="row">
          <div v-for="category in association.categories"
            :key="category.id"
            class="col q-pa-md">
            <q-list>{{category.name}}</q-list>
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

export default {

  computed: {
    ...Vuex.mapState('users', ['userLogin']),
    ...Vuex.mapState('associations', ['allAssociations'])
  },
  methods: {
    ...Vuex.mapActions('associations', ['getAllAssociations', 'deleteAssociation']),
    ...Vuex.mapActions('categories', ['getNameCategory']),
    // MODIFF
    modificar (id) {
      this.$router.push('/associations/' + id)
    },
    // DELETE
    async eliminar (id) {
      await this.deleteAssociation(id)
      await this.getAllAssociations()
    }
  },
  async created () {
    await this.getAllAssociations()
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
