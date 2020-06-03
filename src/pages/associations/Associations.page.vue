<template>
  <q-page class="flex q-pa-md q-gutter-sm">
    <q-list class="full-width" separator>
    <q-btn to="/associations/add" align="left" icon-right="add_box" label="Crear" class="btn-fixed-width" color="primary"/>
      <q-item v-for="association in allAssociations" :key="association.id" v-ripple>
        <q-item clickable tag="a" :href="association.link" target="blank">
          <q-item-section avatar >
              <q-avatar color="primary" text-color="white">
                <img :src="icons[association.id - 1]">
              </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ association.name }}</q-item-label>
            <q-item-label caption >{{ association.description }}</q-item-label>
            <q-item-label>-</q-item-label>
            <q-badge :label="association.listCatNames" />
          </q-item-section>
        </q-item>
        <div v-if="userLogin.roleId === 1">
          <q-btn @click="modificar(association.id)" dense flat align="rigth" icon="edit"></q-btn>
          <q-btn @click="eliminar(association.id)" dense flat  align="rigth" icon="delete"></q-btn>
        </div>

      </q-item>
    </q-list>
  </q-page>
<!--
  <div class="q-pa-md q-gutter-sm">
    <q-btn to="/associations/add" align="left" icon-right="add_box" class="btn-fixed-width" color="primary" label="Crear" />
     <div v-for="association in allAssociations"
      :key="association.index">
      <q-card class="bg-grey-3" flat bordered>
        <div class="row">
          <div v-for="category in association.categories"
            :key="category.id"
            class="col q-pa-md">
            <q-list>{{category.name}}</q-list>
              </div>
        </div>
        <q-separator />
        <q-item clickable tag="a" :href="association.link" target="blank">
          <q-card-section horizontal>
            <div class="q-pa-md">
              <div class="row text-h5 q-mt-sm q-mb-xs">{{association.name}}</div>
              <div class="row text-caption">{{association.description}}</div>
            </div>
          </q-card-section>
        </q-item>
        <q-separator />

        <div v-if="userLogin.roleId === 1">
          <q-separator />
          <div class="row">
            <q-btn @click="modificar(association.id)" color="primary" flat>Modificar</q-btn>
            <q-btn @click="eliminar(association.id)" color="primary" flat>Borrar</q-btn>
          </div>
        </div>

      </q-card>
    </div>

  </div> -->
</template>

<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      icons: [
        'data:image/png;base64,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',
        'data:image/png;base64,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'
      ]
    }
  },
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
    console.log(this.allAssociations)
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
