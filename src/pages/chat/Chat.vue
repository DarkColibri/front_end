<template>
  <q-page ref="pageChat" class="page-chat flex column">
    <q-banner v-if="!userOnline" class="text-center bg-grey-6 fixed-top">
      {{name}} is offline.
    </q-banner>
    <!-- Mensajes -->
    <div :class="{'invisible' : ! showMessages}"
    class="q-pa-md colum col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :name="message.name"
        :text="[message.text]"
        :sent="message.from === userLogin.id ? true:false"
        :bg-color="message.from === userLogin.id ? 'white':'light-green-2'"/>
    </div>
    <!-- FOOTER -->
    <q-footer elevated>
      <q-toolbar>
        <!-- Formilario -->
        <q-form class="full-width">
          <!-- Campo de text -->
          <q-input v-model="newMessage"  label="Message" ref="newMessage" bg-color="white" outlined dense>
            <!-- Boton Reset -->
            <template v-slot:append>
              <q-icon v-if="newMessage !== ''" name="close" @click="onReset" class="cursor-pointer" />
            </template>
            <!-- Botón Enviar -->
            <template v-slot:after>
              <q-btn icon="send" type="submit" @click="sendMessage" round dense flat color="white" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      newMessage: '',
      dense: false,
      showMessages: false
    }
  },
  computed: {
    // --------------------------------------------------------------------
    ...Vuex.mapState('users', ['userLogin', 'selectUser']),
    ...Vuex.mapState('chat', ['messages']),
    // --------------------------------------------------------------------
    userOnline () {
      if (this.selectUser) return this.selectUser.online
      else return false
    },
    name () {
      if (this.selectUser) return this.selectUser.name
      else return ''
    }
  },
  methods: {
    // --------------------------------------------------------------------
    ...Vuex.mapActions('chat', ['getMessages', 'setMessage']),
    ...Vuex.mapActions('users', ['getUserSelect']),
    // --------------------------------------------------------------------
    async sendMessage () {
      if (this.newMessage !== '') {
        await this.setMessage(
          {
            text: this.newMessage,
            from: this.userLogin.id,
            to: this.$route.params.id
          })
        this.getMessages({ id: this.userLogin.id, id2: this.$route.params.id })
        this.onReset()
      }
    },
    // --------------------------------------------------------------------
    onReset () {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    // --------------------------------------------------------------------
    scrollToBottom () {
      const pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20)
    }
  },
  watch: {
    messages: function (val) {
      // console.log('val', val)
      if (Object.keys(val).length) {
        this.scrollToBottom()
        setTimeout(() => {
          this.showMessages = true
        }, 20)
      }
    }
  },
  // --------------------------------------------------------------------
  async created () {
    // console.log(this.$route.params.id)
    await this.getUserSelect(this.$route.params.id)
    await this.getMessages({ id: this.userLogin.id, id2: this.$route.params.id })
    this.$refs.newMessage.focus()
  }
}
</script>

<style lang="stylus">
  .page-chat
    background #e2dfd5
  .q-banner
    top 50px
    z-index 2
</style>

<!--
 ::after {
      content ''
      display block
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 0
      opacity 0.1
      background-image radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent)
      background-size 100px 50px
    }
-->
