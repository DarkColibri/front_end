<template>
  <div class="q-pa-md q-gutter-sm">
  <q-btn to="associations/add/" align="left" icon-right="forum" class="btn-fixed-width" color="primary" label="Crear" />
  <!-- <router-link :to="{ path:'/threads/add/' + thread.id, params: { id: 123 }}">Home</router-link> -->
  <!-- <router-link to="/threads/add/2">Register</router-link> -->
  <associations
    v-for="(association, index) in allAssociations "
      :key="index"
      :id="association.id"
      :description="association.description"
      :name="association.name"
      :link="association.link"/>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Associations from '../../components/associations/Associations.component'

export default {
  components: {
    Associations
  },
  computed: {
    // ...Vuex.mapState('threads', ['allThreadsState']),
    ...Vuex.mapState('associations', ['allAssociations', 'association'])
  },
  methods: {
    ...Vuex.mapActions('associations', ['getAllAssociations', 'getAssociation'])
  },
  created () {
    try {
      this.getAllAssociations()
      // console.log('CREATED Associations. Salimos OK.')
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
