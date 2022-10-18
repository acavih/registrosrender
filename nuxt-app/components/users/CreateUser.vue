<template>
  <v-card :loading="loading" :disabled="loading" tag="form" @submit.prevent="onSubmit">
    <v-card-title>
      Crear usuario
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="formData.user" label="Usuario" />
      <v-text-field
        v-model="formData.password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        label="Contraseña"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary">
        Submit
      </v-btn>
      <v-btn elevation="0" @click="$emit('close')">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

const userDefaultData = {
  user: '', password: 'acavih'

}

export default {
  name: 'CreateUser',
  data () {
    return {
      loading: false,
      showPass: false,
      formData: { ...userDefaultData }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loading = true
        const response = await this.$axios.post('/users', this.formData)
        console.log(response.data)
        this.$emit('success', response.data.payload)
        this.formData = { ...userDefaultData }
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
