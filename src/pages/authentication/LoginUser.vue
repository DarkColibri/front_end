<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator>
        <q-tab name="login" label="Loguin" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
      <!-- Panel Login -->
        <q-tab-panel name="login">
          <LoginComponent :tab="tab"/>
        </q-tab-panel>
      <!-- Panel Register -->
          <q-tab-panel name="register">
            <LoginComponent :tab="tab"/>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

  </q-page>
</template>

<script>
import LoginComponent from '../../components/authentication/LoginComponent'
export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components: {
    LoginComponent
  }
}
</script>
