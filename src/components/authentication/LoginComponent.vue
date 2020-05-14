<template>
  <!-- <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md">   -->
  <q-form
    :action="tab=='login' ? '/signin' : '/signup'"
    method="POST"
    class="q-gutter-md">
  <!-- <form action="/signin" method="POST"> -->
    <q-input v-model="fullname" v-if="tab == 'register'"
      name="fullname"
      class="q-mb-md"
      filled
      label="Your Name *"
      hint="Name and surname"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"/>

 <q-input v-model="username"
      name="username"
      class="q-mb-md"
      filled
      label="Your Name *"
      hint="Name and surname"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"/>

    <q-input v-model="password"
      name="password"
      class="q-mb-md"
      filled
      type="password"
      hint="Password with toggle">
    </q-input>

    <!-- <q-input v-model="form.repeatPassword"
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
    </q-input> -->

    <!-- <q-input v-model="user.email" v-if="tab == 'register'"
      class="q-mb-md"
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

    <q-input v-model="user.age" v-if="tab == 'register'"
      class="q-mb-md"
      filled
      type="number"
      label="Your age *"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Please type your age',
        val => val > 0 && val < 110 || 'Please type a real age']"/>

    <q-toggle v-model="form.accept" v-if="tab == 'register'"
      class="q-mb-md"
      label="I accept the license and terms"/> -->

    <!-- BOTONES -->
    <div class="row">
      <q-space/>
      <q-btn :label="tab" type="submit" color="primary"/>
      <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
    </div>

    <q-input v-if="userState != null" rounded standout v-model="userState.username" label="Rounded standout" />
    <q-input v-if="userState != null" rounded standout v-model="userState.email" label="Rounded standout" />
  </q-form>
  <!-- </form> -->
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
// const debug = require('debug')('src:components:authentication:LoginComponent')

export default {
  props: ['tab'],
  data () {
    return {
      // form: {
      //   username: 'javier',
      //   password: 'javier'
      //   // isPwd: true,
      //   // repeatPassword: null,
      //   // isRepPwd: true,
      //   // accept: false
      // }
      user: {
        username: 'javier_FFF',
        password: 'javier',
        email: null,
        age: null,
        roleId: 3
      },
      // // ------
      username: 'javier_FFF',
      password: 'javier',
      fullname: 'javier'
    }
  },
  computed: {
    ...mapState('users', ['userState'])
  },
  // validations: {
  //   user: {
  //     email: {
  //       required,
  //       email
  //     },
  //     password: {
  //       required,
  //       minLength: minLength(6)
  //     }
  //   }
  //   // form: {
  //   //   repeatPassword: {
  //   //     required,
  //   //     // sameAs: sameAs('user.password')
  //   //   }
  //   // }
  // },
  methods: {
    ...mapActions('users', ['login', 'createUser', 'getUser']),
    async onSubmit () {
      // // email
      // this.$v.user.email.$touch()
      // if (this.$v.user.email.$error && this.tab === 'register') {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'Please enter valid email.'
      //   })
      //   return
      // }
      // // password
      // this.$v.user.password.$touch()
      // if (this.$v.user.password.$error) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'Please enter valid password.'
      //   })
      //   return
      // }
      // // repeatPassword
      // // this.$v.form.repeatPassword.$touch()
      // // if (this.$v.form.repeatPassword.$error) {
      // //   this.$q.notify({
      // //     color: 'red-5',
      // //     textColor: 'white',
      // //     icon: 'warning',
      // //     message: 'Please enter same password.'
      // //   })
      // //   return
      // // }
      // if (this.form.accept !== true && this.tab === 'register') {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'You need to accept the license and terms first'
      //   })
      //   return
      // }

      // CREATE USER
      try {
        if (this.tab === 'register') {
          console.log('USER: ' + JSON.stringify(this.user))
          await this.createUser(this.user)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'User ' + this.userState.name + ' created.'
            // message: 'User created.'
          })
        } else {
        // GET USER
          console.log('VUE LOGIN: ' + JSON.stringify(this.user))
          // await this.getUser(this.user)
          const result = await this.login(this.user)
          console.log('===============================================')
          console.log(result)
          console.log('===============================================')
          console.log(this.userState)
          console.log('this.userState ' + this.userState.username)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'User ' + this.userState.username + ' logged.'
            // message: 'User logged.'
          })
          // this.$router.push('/users')
        }
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

<style>

</style>
