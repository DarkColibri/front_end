<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn to="/categories/add" align="left" icon-right="add_box" class="btn-fixed-width" color="primary" label="Crear" />
    <!-- <router-link :to="{ path:'/threads/add/' + thread.id, params: { id: 123 }}">Home</router-link> -->
    <!-- <router-link to="/threads/add/2">Register</router-link> -->
    <div v-for="category in allCategories"
      :key="category.index">
      <q-card class="bg-grey-3" flat bordered>

        <!-- NOMBRE y DESCRIPCION -->
        <q-card-section horizontal>
          <div class="q-pa-md">
            <div class="row text-h5 q-mt-sm q-mb-xs">{{category.name}}</div>
            <div class="row text-caption">{{category.description}}</div>
          </div>
        </q-card-section>

        <q-separator />
        <!-- BOTONES -->
        <div v-if="userLogin.roleId === 1">
          <q-separator />
          <div class="row">
            <q-btn @click="modificar(category.id)" color="primary" flat>Modificar</q-btn>
            <q-btn @click="eliminar(category.id)" color="primary" flat>Borrar</q-btn>
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
    ...Vuex.mapState('categories', ['allCategories'])
  },
  methods: {
    ...Vuex.mapActions('categories', ['getAllCategories', 'deleteCategory', 'updateCategory']),
    // MODIFF
    modificar (id) {
      this.$router.push('/categories/' + id)
    },
    // DELETE
    async eliminar (id) {
      await this.deleteAssociation(id)
      await this.getAllCategories()
    }
  },
  async created () {
    await this.getAllCategories()
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
