<template>
  <div class="q-pa-md q-gutter-sm">
  <q-btn to="associations/add/" align="left" icon-right="forum" class="btn-fixed-width" color="primary" label="Crear" />
  <!-- <router-link :to="{ path:'/threads/add/' + association.id, params: { id: 123 }}">Home</router-link> -->
  <!-- <router-link to="/threads/add/2">Register</router-link> -->
  <div v-if="params !== null">
  <add
    :id="association.id"
    :description="association.description"
    :name="association.name"
    :link="association.link"/>
  </div>
  <div v-else>
  <associations
    v-for="(association, index) in allAssociations "
      :key="index"
      :id="association.id"
      :description="association.description"
      :name="association.name"
      :link="association.link"/>
  </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Associations from '../../components/associations/Associations.component'
import AssociationsAdd from '../../components/associations/Associations.Add.component'
export default {
  data () {
    return {
      path: '',
      params: null
    }
  },
  components: {
    associations: Associations,
    add: AssociationsAdd
  },
  computed: {
    ...Vuex.mapState('associations', ['allAssociations', 'association']),
    ...Vuex.mapState('users', ['userLogin'])
  },
  methods: {
    ...Vuex.mapActions('associations', ['getAllAssociations', 'getAssociation'])
  },
  async created () {
    try {
      console.log('CREATED ASSOCIATIONS')
      console.log(this.$route.fullPath)
      console.log(this.$route.params.id)
      this.path = this.$route.fullPath
      this.params = this.$route.params.id
      if (this.params) {
        await this.getAssociation(this.params)
      }
      await this.getAllAssociations()
    } catch (error) {
      console.log(error)
    }
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
