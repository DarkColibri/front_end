<template>
  <q-page class="flex q-pa-md">

    <q-list
    class="full-width"
    separator>
      <q-item v-for="(user, key) in allUsers"
      :key="key"
      to="/chat"
      clickable
      v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  // data () {
  //   return {
  //     online: false
  //   }
  // },
  computed: {
    ...mapGetters('users', ['userLogin', 'allUsers'])
  },
  methods: {
    ...mapActions('users', ['getAllUsers'])
  },
  created () {
    this.getAllUsers()
  }
}
</script>
