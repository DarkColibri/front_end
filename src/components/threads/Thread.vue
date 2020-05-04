<template>
<div class="q-pa-md bg-grey-3" >
    <q-list>
      <q-item>
        <router-link :to="'/posts/' + id">
          <q-item-section @click="selectThread(id)">
            <q-item-label>{{subject}}</q-item-label>
            <q-item-label caption lines="10">{{description}}</q-item-label>
          </q-item-section>
        </router-link>
        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'Thread',
  props: ['id', 'description', 'subject'],
  methods: {
    selectThread (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
