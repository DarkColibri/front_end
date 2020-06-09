<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn aria-label="Menu"
          v-if="userLogin != null" flat dense round icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"/>

        <q-btn icon="arrow_back"
          v-go-back.single
          flat dense />

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
          @click="UserLogout(userLogin)"
          class="absolute-right q-pr-sm"
          icon="exit_to_app"
          no-caps
          flat
          dense
          :label="userLogin.name" />
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

    <q-page-container v-if="userLogin != null || ruta">
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
          icon: 'person',
          link: '/profile'
        },
        {
          title: 'Usuarios',
          caption: 'usuarios',
          icon: 'group',
          link: '/users'
        },
        {
          title: 'Asociaciones',
          caption: 'asociaciones',
          icon: 'group_work',
          link: '/associations'
        },
        {
          title: 'Categorias',
          caption: 'categorias',
          icon: 'category',
          link: '/categories'
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
    ...Vuex.mapState('users', ['userLogin', 'selectUser']),
    title () {
      const currentPath = this.$route.fullPath
      let name = ''

      if (this.selectUser !== null) {
        name = this.selectUser.name
      }

      if (currentPath.includes('/chat')) return name
      else if (currentPath.includes('/auth')) return 'Login'
      else if (currentPath.includes('/categories')) return 'Categorías'
      else if (currentPath.includes('/categories/add')) return 'Nueva Categoría'
      else if (currentPath.includes('/threads')) return 'Foros'
      else if (currentPath.includes('/threads/add')) return 'Nuevo Foro'
      else if (currentPath.includes('/posts/')) return 'Posts'
      else if (currentPath.includes('/associations')) return 'Asociaciones'
      else if (currentPath.includes('/users')) return 'Usuarios'
      else if (currentPath.includes('/profile')) return 'Perfil'
      return 'Delicius Garden'
    },
    ruta () {
      const currentPath = this.$route.fullPath
      if (currentPath === '/' || currentPath === '/login') return true
      return false
    }
  },
  methods: {
    ...Vuex.mapActions('users', ['UserLogout'])
    // ...Vuex.mapActions('categories', ['getAllCategories'])
    // async logout () {
    //   console.log('logout')
    //   await this.UserLogout(this.userLogin)
    // }

  }
  // beforeCreate () {
  //   console.log('MainLayout BeforCreated ..........')
  //   // console.log('MainLayout BeforCreated ..........')
  // },
  // async created () {
  //   try {
  //     await this.UserLogin(this.$route.fullPath)
  //     if (this.userLogin === null) {
  //       if (this.$route.fullPath !== '/' && this.$route.fullPath !== '/login') {
  //         this.$router.push('/login')
  //       }
  //     }
  //   } catch (err) {
  //     console.error('ERROR MainLayout')
  //     console.log(err)
  //     console.log('CREATED MainLayout. Salimos KO.')
  //   }
  // },
  // begoreDestroy () {
  //   // ///////////////
  //   //    LOGOUT    //
  //   // ///////////////

  //   // console.log('*********  DESTROYED *********')
  //   // this.UserLogout(this.userLogin)
  // }
}

</script>
