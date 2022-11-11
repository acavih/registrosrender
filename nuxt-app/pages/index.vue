<template>
  <v-sheet>
    <v-alert color="error" dark v-if="msg">
      {{ msg }}
    </v-alert>
    <v-card
      :loading="loading"
      :disabled="loading"
      tag="form"
      @submit.prevent="onSubmit"
    >
      <v-card-title> Acceder al area interna </v-card-title>
      <v-card-text>
        <v-text-field v-model="formData.user" label="Usuario" />
        <v-text-field
          v-model="formData.password"
          type="password"
          label="Contraseña"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" elevation="0" color="primary">Acceder</v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "LoginPage",
  layout: "guest",
  data() {
    return {
      loading: false,
      msg: "",
      formData: {
        user: "",
        password: "",
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
        const loginReq = await this.$auth.loginWith("local", {
          data: this.formData,
        });
        this.$store.dispatch("resources/retrieveResources");
        console.log(loginReq);
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error);
          console.log("ERROR DE AXIOS");
          this.msg = error.response.data.message;
        } else {
          console.log(error);
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
