<template>
<q-page class="flex q-pa-md q-gutter-sm">
    <q-list class="full-width" separator>
    <q-btn to="/categories/add" align="left" icon-right="add_box" label="Crear" class="btn-fixed-width" color="primary"/>
      <q-item v-for="category in allCategories" :key="category.index" v-ripple>
          <q-item-section>
            <q-item-label>{{ category.name }}</q-item-label>
            <q-item-label caption >{{ category.description }}</q-item-label>
          </q-item-section>
        <div v-if="userLogin.roleId === 1">
          <q-btn @click="modificar(category.id)" dense flat align="rigth" icon="edit"></q-btn>
          <q-btn @click="eliminar(category.id)" dense flat  align="rigth" icon="delete"></q-btn>
        </div>

      </q-item>
    </q-list>
  </q-page>

  <!-- <div class="q-pa-md q-gutter-sm">
    <q-btn to="/categories/add" align="left" icon-right="add_box" class="btn-fixed-width" color="primary" label="Crear" />
    <div v-for="category in allCategories"
      :key="category.index">
      <q-card class="bg-grey-3" flat bordered>
        <q-card-section horizontal>
          <div class="q-pa-md">
            <div class="row text-h5 q-mt-sm q-mb-xs">{{category.name}}</div>
            <div class="row text-caption">{{category.description}}</div>
          </div>
        </q-card-section>
        <q-separator />
        <div v-if="userLogin.roleId === 1">
          <q-separator />
          <div class="row">
            <q-btn @click="modificar(category.id)" color="primary" flat>Modificar</q-btn>
            <q-btn @click="eliminar(category.id)" color="primary" flat>Borrar</q-btn>
          </div>
        </div>
      </q-card>
    </div>
  </div> -->
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
      await this.deleteCategory(id)
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
