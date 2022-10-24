<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    tag="form"
    @submit.prevent="onSubmit"
  >
    <v-card-title> Acceder al area interna </v-card-title>
    <v-card-text>
      <v-text-field v-model="formData.user" label="Usuario" />
      <v-text-field v-model="formData.password" type="password" label="Contraseña" />
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary">Acceder</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginPage",
  layout: 'guest',
  data() {
    return {
      loading: false,
      formData: {
        user: '',
        password: ''
      },
    };
  },
  head() {
    return {
      title: "Acceder al area interna",
    };
  },
  methods: {
    async onSubmit(e) {
      try {
        this.loading = true;
        await sleep(1000);
        console.log(this.formData);
        this.loading = false;
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error);
          return console.log("ERROR DE AXIOS");
        }
        console.log(error);
      }
    },
  },
};
</script>
