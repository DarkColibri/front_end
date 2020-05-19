<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Desplegable -->
        <q-btn v-if="userState != null"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"/>
        <!-- Botón bac -->
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          flat
          dense
          label="Back" />
        <!-- Título -->
        <q-toolbar-title class="absolute-center">{{title}}</q-toolbar-title>
        <!-- Botón Login -->
        <q-btn
          v-if="userState === null"
          to="/login"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />
      <q-btn
          v-else
          @click="UserLogout"
          class="absolute-right q-pr-sm"
          icon="exit_to_app"
          no-caps
          flat
          dense
          label="Logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1">
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Categorías
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import Vuex from 'vuex'
import { openURL } from 'quasar'
import { route } from 'quasar/wrappers'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Usuarios',
          caption: 'usuaios',
          icon: 'account_box',
          link: '/users'
        },
        {
          title: 'Perfil',
          caption: 'Perfil',
          icon: 'account_box',
          link: '/profile'
        },
        {
          title: 'Foro',
          caption: 'forum',
          icon: 'record_voice_over',
          link: '/threads'
        },
        {
          title: 'Chat',
          caption: 'Chat',
          icon: 'chat_bubble',
          link: '/chat'
        },
        {
          title: 'Videos',
          caption: '@quasarframework',
          icon: 'ondemand_video',
          link: '/videos'
        },
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://www.facebook.com/loswildtrapas/?__tn__=%2Cd%2CP-R&eid=ARDwTeSlXndylwJuJmQAdhMBHZzg6l-LaDifc9vJBQ7EfyV6XqLoGs1znRh3YliJE15TrSe-O1I-8EQd'
        }
      ]
    }
  },
  components: {
    EssentialLink
  },
  computed: {
    ...Vuex.mapState('users', ['userState']),
    title () {
      // console.log(this.$route)
      const currentPath = this.$route.fullPath
      console.log(currentPath)
      if (currentPath === '/chat') return 'Chat'
      else if (currentPath === '/auth') return 'Loguin'
      else if (currentPath === '/threads/') return 'Temas'
      else if (currentPath === '/posts/') return 'Posts'
      else if (currentPath === '/users') return 'Usuarios'
      else if (currentPath === '/profile') return 'Perfil'
      return 'Delicius Garden'
    }
  },
  methods: {
    ...Vuex.mapActions('users', ['UserLogin', 'UserLogout'])

  },
  // beforeCreate () {
  //   console.log('MainLayout BeforCreated ..........')
  //   // console.log('MainLayout BeforCreated ..........')
  // },
  async created () {
    try {
      console.log('MainLayout Created .................. ' + this.$route.fullPath)
      await this.UserLogin(this.$route.fullPath)
      console.log('MainLayout UserState:')
      console.log(this.userState)

      if (this.userState === null) {
        console.log('Usuario NULL!!')
        if (this.$route.fullPath !== '/' && this.$route.fullPath !== '/login') {
          console.log('Go to ... /login')
          this.$router.push('/login')
          // console.log('>>>>>>>>>>>>>')
        }
      }
    } catch (err) {
      console.error('ERROR MainLayout')
      console.log(err)
    }
    // console.log('Go to ... ' + this.$route.fullPath)
    // console.log('MainLayout Created ........')
  }
  // beforeMount () {
  //   console.log('BeforeMount .................')
  //   console.log(this.userState)
  //   console.log('BeforeMount .................')
  // },
  // mounted () {
  //   console.log('mounted .................')
  //   console.log(this.userState)
  //   console.log('mounted .................')
  //   // try {
  //   //   console.log('MOUNTED MainLayout : ' + this.$route.fullPath)
  //   //   await this.UserLogin(this.$route.fullPath)
  //   //   console.log('USER')
  //   //   console.log(this.userState)

  //   //   if (this.userState === null) {
  //   //     console.log('Usuario NULL.')
  //   //     if (this.$route.fullPath !== '/' && this.$route.fullPath !== '/login') {
  //   //       console.log('Go to ... /login')
  //   //       this.$router.push('/login')
  //   //       console.log('>>>>>>>>>>>>>')
  //   //     }
  //   //   }
  //   //   console.log('Go to ... ' + this.$route.fullPath)
  //   // } catch (err) {
  //   //   console.error('ERROR MainLayout')
  //   //   console.log(err)
  //   // }
  // },
  // beforeUpdate () {
  //   console.log('beforeUpdate .................')
  //   console.log(this.userState)
  //   console.log('beforeUpdate .................')
  // },
  // updated () {
  //   console.log('updated .................')
  //   console.log(this.userState)
  //   console.log('updated .................')
  // },
  // beforeDestroy () {
  //   console.log('updated .................')
  //   console.log(this.userState)
  //   console.log('updated .................')
  // },
  // destroyed () {
  //   console.log('updated .................')
  //   console.log(this.userState)
  //   console.log('updated .................')
  // }

}
</script>
