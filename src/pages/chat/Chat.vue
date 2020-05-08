<template>
  <q-page class="flex column">
    <q-banner class="text-center bg-grey-4">
      User is offline.
    </q-banner>
    <!-- Mensajes -->
    <div class="q-pa-md colum col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true:false"/>
    </div>
    <!-- FOOTER -->
    <q-footer elevated>
      <q-toolbar>
        <!-- Formilario -->
        <q-form class="full-width">
          <!-- Campo de text -->
        <q-input v-model="newMessage"  label="Message" bg-color="white" outlined dense>
          <!-- Boton Reset -->
          <template v-slot:append>
            <q-icon v-if="newMessage !== ''" name="close" @click="newMessage = ''" class="cursor-pointer" />
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
export default {
  data () {
    return {
      newMessage: '',
      text: '',
      dense: false,
      messages: [
        {
          text: 'Hola que tal?',
          from: 'me'
        },
        {
          text: 'De puta madre tio, y tu?',
          from: 'them'
        },
        {
          text: 'De lujo',
          from: 'me'
        }
      ]
    }
  },
  methods: {
    sendMessage () {
      console.log('SEND MESSAGE!!!!')
      this.messages.push(
        {
          text: this.newMessage,
          from: 'me'
        }
      )
    },
    onReset () {
      console.log('RESEEEET !!!')
    }
  }
}
</script>
