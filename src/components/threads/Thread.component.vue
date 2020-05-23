<template>
  <div>
    <q-list>
      <q-card class="bg-grey-3" flat bordered>
          <div class="row">
            <div class="col q-pa-md">Categoría: {{category}}</div>
          </div>
          <q-separator />
          <q-item clickable tag="a" :href="'/posts/' + id" >
            <q-card-section horizontal>
              <div class="q-pa-md">
                <div class="row text-h5 q-mt-sm q-mb-xs">{{subject}}</div>
                <div class="row text-caption text-grey">{{description}}</div>
              </div>
            </q-card-section>
          </q-item>
          <q-separator />

          <q-card-section horizontal>
            <div class="q-pa-md">
              <div class="text-subtitle2">User:  {{user}}</div>
            </div>
            <div class="q-pa-md absolute-right">
              <div class="text-subtitle2">Created at {{date}}</div>
            </div>
          </q-card-section>
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
  name: 'Thread',
  props: ['id', 'description', 'subject', 'categoryId', 'userId', 'replies', 'createdAt'],
  data () {
    return {
      user: '',
      category: '',
      date: ''
    }
  },
  computed: {
    ...Vuex.mapState('users', ['userLogin'])
  },
  methods: {
    ...Vuex.mapActions('categories', ['getNameCategory']),
    ...Vuex.mapActions('users', ['getNameUser']),
    ...Vuex.mapActions('threads', ['getAllThreads', 'deleteThread']),
    modificar () {
      this.$router.push('/threads/add/' + this.id)
    },
    eliminar () {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Está seguro de que quiere eliminar el foro: "' + this.subject + '"?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        // DELETE
        const deleted = await this.deleteThread(this.id)
        console.log('DELETED: ' + deleted)
        // RELOAD
        await this.getAllThreads()
        this.$router.push('/threads')
      })
    }
  },
  async created () {
    this.category = await this.getNameCategory(this.categoryId)
    this.user = await this.getNameUser(this.userId)
    this.date = timeagoInstance.format(this.createdAt)
  },
  async updated () {
    this.category = await this.getNameCategory(this.categoryId)
    this.user = await this.getNameUser(this.userId)
    this.date = timeagoInstance.format(this.createdAt)
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
