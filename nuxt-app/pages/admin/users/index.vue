<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      Listado de usuarios
      <v-spacer />
      <v-btn color="primary" elevation="0">
        Añadir usuario
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="user in data" :key="user._id">
          <v-list-item-content>
            <v-list-item-title>
              {{ user.user }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="secondary" elevation="0" small>
              Cambiar contraseña
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}

export default {
  name: 'UsersList',
  data () {
    return {
      loading: false,
      data: [],
      headers: [
        { text: 'Nombre de usuario', value: 'user' }
      ]
    }
  },
  head () {
    return {
      title: 'Listado de usuarios'
    }
  },
  async mounted () {
    await this.retrieveData()
  },
  methods: {
    async retrieveData () {
      try {
        this.loading = true
        const users = await this.$axios.get('/auth/')
        this.data = users.data.payload
        this.loading = false
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error)
          return console.log('ERROR DE AXIOS')
        }
        console.log(error)
      }
    }
  }
}
</script>
