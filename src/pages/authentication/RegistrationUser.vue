<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>REGÍSTRATE</h4>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md">

      <q-input v-model="user.name"
        filled
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"/>

      <q-input v-model="user.password"
        filled
        :type="form.isPwd ? 'password' : 'text'"
        hint="Password with toggle"
        lazy-rules
        @blur="$v.user.password.$touch"
        @keyup.enter="onSubmit"
        :error="$v.user.password.$error">
        <template v-slot:append>
          <q-icon
            :name="form.isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="form.isPwd = !form.isPwd"/>
        </template>
      </q-input>
<!--
      <q-input v-model="form.repeatPassword"
        filled
        :type="form.isRepPwd ? 'password' : 'text'"
        hint="Repeat Password"
        lazy-rules
        @blur="$v.form.repeatPassword.$touch"
        @keyup.enter="onSubmit"
        :error="$v.form.repeatPassword.$error">
        <template v-slot:append>
          <q-icon
            :name="form.isRepPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="form.isRepPwd = !form.isRepPwd"/>
        </template>
      </q-input>
-->
      <q-input v-model="user.email"
        filled
        type="email" label="Enter your email" hint="example@gmail.com"
        lazy-rules
        @blur="$v.user.email.$touch"
        @keyup.enter="onSubmit"
        :error="$v.user.email.$error">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input v-model="user.age"
        filled
        type="number"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 110 || 'Please type a real age']"/>

      <q-toggle v-model="form.accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        isPwd: true,
        repeatPassword: null,
        isRepPwd: true,
        accept: false
      },
      user: {
        name: null,
        password: null,
        email: null,
        age: null,
        roleId: 3
      }
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
    // form: {
    //   repeatPassword: {
    //     required,
    //     // sameAs: sameAs('user.password')
    //   }
    // }
  },
  methods: {
    ...mapActions('users', ['createUser']),
    async onSubmit () {
      // email
      this.$v.user.email.$touch()
      if (this.$v.user.email.$error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Please enter valid email.'
        })
        return
      }
      // password
      this.$v.user.password.$touch()
      if (this.$v.user.password.$error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Please enter valid password.'
        })
        return
      }
      // repeatPassword
      // this.$v.form.repeatPassword.$touch()
      // if (this.$v.form.repeatPassword.$error) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'Please enter same password.'
      //   })
      //   return
      // }
      if (this.form.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
        return
      }
      // CREATE USER
      try {
        console.log('USER: ' + this.user)
        await this.createUser(this.user)
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      } catch (error) {
        console.log(error)
      }
      // }
    },
    onReset () {
      console.log('On RESET!!')
      this.user.name = null
      this.user.age = null
      this.user.password = null
      this.user.accept = false
    }
  }
}
</script>
