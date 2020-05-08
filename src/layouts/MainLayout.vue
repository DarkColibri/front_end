<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Desplegable -->
        <q-btn
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
          to="/login"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />

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
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  computed: {
    title () {
      // console.log(this.$route)
      const currentPath = this.$route.fullPath
      if (currentPath === '/chat') return 'Chat'
      else if (currentPath === '/auth') return 'Loguin'
      else if (currentPath === '/threads') return 'Temas'
      else if (currentPath === '/posts') return 'Loguin'
      else if (currentPath === '/') return 'Usuarios'
      return 'Delicius Garden'
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Usuarios',
          caption: 'usuaios',
          icon: 'account_box',
          link: '/'
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
  methods: {
    openURL
  }
}
</script>
