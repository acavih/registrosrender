<template>
  <v-sheet>
    <v-card :loading="loading" :disabled="loading">
      <v-card-title>
        Listado de usuarios
        <v-spacer />
        <v-dialog v-model="creatingUser">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              elevation="0"
              v-bind="attrs"
              v-on="on"
            >
              Añadir usuario
            </v-btn>
          </template>
          <create-user @close="creatingUser = false" @success="addUser" />
        </v-dialog>
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
              <v-flex>
                <v-btn color="secondary" elevation="0" small>
                  Cambiar contraseña
                </v-btn>
                <v-btn icon color="error" dark @click="deleteUser(user)">
                  <v-icon dark right>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-flex>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import CreateUser from '@/components/users/CreateUser.vue'

export default {
  name: 'UsersList',
  components: { CreateUser },
  data () {
    return {
      loading: false,
      data: [],
      headers: [
        { text: 'Nombre de usuario', value: 'user' }
      ],
      creatingUser: false
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
    addUser (user) {
      this.data.push(user)
      this.creatingUser = false
    },
    async deleteUser (user) {
      const res = await this.$dialog.confirm({
        text: '¿Realmente quieres eliminar el usuario ' + user.user + '?'
      })
      if (res) {
        await this.$axios.delete('/users/' + user._id)
        this.data = [...this.data.filter(u => u._id !== user._id)]
        this.$dialog.notify.error('El usuario se elimino con éxito', {
          timeout: 3000
        })
      }
    },
    async retrieveData () {
      try {
        this.loading = true
        const users = await this.$axios.get('/users/')
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
