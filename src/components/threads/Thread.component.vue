<template>
<div class="q-pa-md bg-grey-3" >
    <q-list>
      <q-item>
        <router-link :to="'/posts/' + id">
          <q-item-section>
            <q-item-label>{{subject}}</q-item-label>
            <q-item-label caption lines="10">{{description}}</q-item-label>
          </q-item-section>
        </router-link>
        <q-item-section side top>
          <q-item-label caption>{{date}}</q-item-label>
          <q-item-label caption>{{user}}</q-item-label>
          <q-item-label caption>{{category}}</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
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
  methods: {
    ...Vuex.mapActions('categories', ['getNameCategory']),
    ...Vuex.mapActions('users', ['getNameUser'])
  },
  async mounted () {
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
