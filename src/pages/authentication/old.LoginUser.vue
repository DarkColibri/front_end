<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5>Login</h5>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md">

      <q-input v-model="user.name"
        filled
        label="User name *"
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
        isPwd: true
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
    // async
    onSubmit () {
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
      // CREATE USER
      try {
        console.log('USER: ' + this.user)
        // await this.createUser(this.user)
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Loged'
        })
      } catch (error) {
        console.log(error)
      }
      // }
    },

    onReset () {
      console.log('RESEEEET !!!')
      this.user.name = null
      this.user.password = null
      this.user.accept = false
    }
  }
}
</script>
