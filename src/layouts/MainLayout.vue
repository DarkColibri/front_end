<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Desplegable -->
        <q-btn v-if="userLogin != null"
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
          v-if="userLogin === null"
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
          title: 'Perfil',
          caption: 'Perfil',
          icon: 'account_box',
          link: '/profile'
        },
        {
          title: 'Usuarios',
          caption: 'usuarios',
          icon: 'account_box',
          link: '/users'
        },
        {
          title: 'Asociaciones',
          caption: 'asociaciones',
          icon: 'group',
          link: '/associations'
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
    ...Vuex.mapState('users', ['userLogin']),
    title () {
      // console.log('Computed Main Layout')
      const currentPath = this.$route.fullPath
      // console.log(currentPath)
      if (currentPath === '/chat') return 'Chat'
      else if (currentPath === '/auth') return 'Login'
      else if (currentPath === '/threads') return 'Foros'
      else if (currentPath.includes('/threads/add')) return 'Nuevo Foro'
      else if (currentPath.includes('/posts/')) return 'Posts'
      else if (currentPath.includes('/associations')) return 'Asociaciones'
      else if (currentPath === '/users') return 'Usuarios'
      else if (currentPath === '/profile') return 'Perfil'
      return 'Delicius Garden'
    }
  },
  methods: {
    ...Vuex.mapActions('users', ['UserLogin', 'UserLogout']),
    ...Vuex.mapActions('categories', ['getAllCategories'])

  },
  // beforeCreate () {
  //   console.log('MainLayout BeforCreated ..........')
  //   // console.log('MainLayout BeforCreated ..........')
  // },
  async created () {
    try {
      // console.log('CREATED MainLayout [' + this.$route.fullPath + ']')
      await this.UserLogin(this.$route.fullPath)
      // console.log('MainLayout userLogin:')
      // console.log('Usuario logueado: ' + JSON.stringify(this.userLogin))

      if (this.userLogin === null) {
        // console.log('Usuario NULL!!')
        if (this.$route.fullPath !== '/' && this.$route.fullPath !== '/login') {
          // console.log('Go to ... /login')
          this.$router.push('/login')
          // console.log('>>>>>>>>>>>>>')
        }
      }
      // console.log('CREATED MainLayout. Salimos OK.')
    } catch (err) {
      console.error('ERROR MainLayout')
      console.log(err)
      console.log('CREATED MainLayout. Salimos KO.')
    }
    // console.log('Go to ... ' + this.$route.fullPath)
    // console.log('CREATED MainLayout [ESTO SIEMPRE SALE]')
  }
  // beforeMount () {
  //   console.log('BeforeMount .................')
  //   console.log(this.userLogin)
  //   console.log('BeforeMount .................')
  // },
  // mounted () {
  //   console.log('mounted .................')
  //   console.log(this.userLogin)
  //   console.log('mounted .................')
  //   // try {
  //   //   console.log('MOUNTED MainLayout : ' + this.$route.fullPath)
  //   //   await this.UserLogin(this.$route.fullPath)
  //   //   console.log('USER')
  //   //   console.log(this.userLogin)

  //   //   if (this.userLogin === null) {
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
  //   console.log(this.userLogin)
  //   console.log('beforeUpdate .................')
  // },
  // updated () {
  //   console.log('updated .................')
  //   console.log(this.userLogin)
  //   console.log('updated .................')
  // },
  // beforeDestroy () {
  //   console.log('updated .................')
  //   console.log(this.userLogin)
  //   console.log('updated .................')
  // },
  // destroyed () {
  //   console.log('updated .................')
  //   console.log(this.userLogin)
  //   console.log('updated .................')
  // }

}
</script>
