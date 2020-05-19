<template>
  <q-page class="flex q-pa-md">
    <q-list
    class="full-width"
    separator>
      <q-item v-for="user in allUsersState"
      :key="user.id"
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
          <q-badge
            :color="online ? 'light-green-5' : 'grey-4'">
            {{ online ? 'Online' : 'offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      online: false
    }
  },
  computed: {
    ...mapState('users', ['allUsersState', 'userState'])
  },
  methods: {
    ...mapActions('users', ['getAllUsers'])
  },
  // beforeCreate () {
  //   console.log('User BeforCreated .................')
  //   console.log(this.userState)
  //   console.log('User BeforCreated .................')
  // },
  async created () {
    console.log('User Created ...................')
    console.log(this.userState)
    await this.getAllUsers()
    console.log('User Created ...................')
  }
  // beforeMount () {
  //   console.log('User BeforeMount .................')
  //   console.log(this.userState)
  //   console.log('User BeforeMount .................')
  // },
  // mounted () {
  //   console.log('User Mounted .................')
  //   console.log(this.userState)
  //   console.log('User Mounted .................')
  // },
  // async beforeUpdate () {
  //   console.log('User beforeUpdate .................')
  //   console.log(this.userState)
  //   // if (this.userState !== null) {
  //   await this.getAllUsers()
  //   // }
  //   console.log('User beforeUpdate .................')
  // },
  // updated () {
  //   console.log('User updated .................')
  //   console.log(this.userState)
  //   console.log('User updated .................')
  // },
  // beforeDestroy () {
  //   console.log('User updated .................')
  //   console.log(this.userState)
  //   console.log('User updated .................')
  // },
  // destroyed () {
  //   console.log('User updated .................')
  //   console.log(this.userState)
  //   console.log('User updated .................')
  // }

}
</script>
