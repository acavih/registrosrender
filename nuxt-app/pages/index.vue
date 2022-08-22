<template>
  <v-card outlined tag="form" @submit.prevent="login">
    <v-card-title>Acceder al panel</v-card-title>

    <v-card-text v-if="status >= 400">
      <v-alert dark color="error">
        {{ error.message }}
      </v-alert>
    </v-card-text>

    <v-card-text>
      <v-text-field v-model="user.username" label="Nombre de usuaro" />
      <v-text-field v-model="user.password" label="Contraseña" type="password" />
    </v-card-text>
    <v-card-text>
      <v-btn color="primary" elevation="0" type="submit">
        Login
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'guestlayout',
  data () {
    return {
      error: {
        message: ''
      },
      status: -1,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', { data: this.user })
      } catch (error) {
        console.dir('Ocurrio un error', error)
        console.dir(error)

        if (error.isAxiosError) {
          const response = error.response
          this.error = response.data
          this.status = response.status
        }
      }
    }
  }
}
</script>
