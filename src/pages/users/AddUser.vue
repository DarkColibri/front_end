<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md">

      <q-input v-model="name"
        filled
        label="Your name *"
        hint="Name and surname"
        lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/>

      <q-input v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"/>
        </template>
      </q-input>

      <q-input v-model="repeatPassword"
        filled
        :type="isRepPwd ? 'password' : 'text'"
        hint="Repeat Password">
        <template v-slot:append>
          <q-icon
            :name="isRepPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isRepPwd = !isRepPwd"/>
        </template>
      </q-input>

      <q-input v-model="email"
        filled
        type="email" label="Enter yor email" hint="example@gmail.com"
        lazy-rules
        @blur="$v.email.$touch"
        @keyup.enter="submit"
        :error="$v.email.$error">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input v-model="age"
        filled
        type="number"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 110 || 'Please type a real age']"/>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />

      </div>
    </q-form>

  </div>
</template>

<script>
import { required, email, password, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: null,
      password: null,
      isPwd: true,
      repeatPassword: null,
      isRepPwd: true,
      email: null,
      age: null,
      accept: false
      // form: {
      //   email: ''
      // }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      password,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        // email
        this.$v.email.$touch()
        if (this.$v.email.$error) {
          this.$q.notify('Please enter valid email.')
          return
        }
        // password
        this.$v.password.$touch()
        if (this.$v.password.$error) {
          this.$q.notify('Please enter valid password.')
          return
        }
        // repeatPassword
        this.$v.repeatPassword.$touch()
        if (this.$v.repeatPassword.$error) {
          this.$q.notify('Please enter same password.')
          return
        }
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
