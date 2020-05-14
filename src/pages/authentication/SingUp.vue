<template>
  <!-- <form
    action="/singup"
    method="POST"
    class="q-gutter-md">

    <input name="fullName"
      class="q-mb-md"
      label="Nombre"/>

    <input name="password"
      class="q-mb-md"
      lavel="Password"
      type="password"/>

    <input name="email"
      class="q-mb-md"
      label="Email"/>

    <input name="age"
      class="q-mb-md"
      label="Age"/>

    <div class="row">
      <q-space/>
      <q-btn label="Enviar" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </form> -->
    <div class="container p-4">
  <div class="row">
    <div class="col-md-4 mx-auto">
      <div class="card text-center">
        <div class="card-header">
          <h3>SignUp</h3>
        </div>
        <div class="card-body">
          <form action="/singup" method="POST">
            <div class="form-group">
              <input type="type" name="fullname" placeholder="Full Name" class="form-control" autofocus>
            </div>
            <div class="form-group">
              <input type="text" name="username" placeholder="Username" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" name="password" placeholder="Password" class="form-control">
            </div>
            <div class="form-group">
              <button class="btn btn-success btn-block">
                SingIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>

export default {

  data () {
    return {
      // fullName: null,
      // password: null,
      // email: null,
      // age: null
    }
  },
  computed: { },
  methods: {
    onSubmit () {
      console.log('Enviar')
      // }
    },
    onReset () {
      console.log('On RESET!!')
      this.name = null
      this.age = null
      this.password = null
      this.accept = false
    }
  }
}
</script>

<style>

</style>
