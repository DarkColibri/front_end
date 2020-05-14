<!--  PANTALLA DE LOGIN   -->
<template>
  <form
    action="/auth/local"
    method="POST">

    <h5>Please, login to see the secret content</h5>
    <p>
      <span>To login, use <b>yogesum@gmail.com</b> as email and <b>SuperAdmin</b> as password.</span>
    </p>
    <q-input v-model="form.email"
      class="q-mb-md"
      filled
      label="Your Name *"
      hint="Name and surname"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"/>

    <q-input v-model="form.password"
      class="q-mb-md"
      filled
      type="password"
      hint="Password with toggle"/>

    <div class="row">
      <q-space/>
      <q-btn label="Enviar" type="submit" color="primary"/>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      form: { error: '', email: 'yogesum@gmail.com', password: 'SuperAdmin' }
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
