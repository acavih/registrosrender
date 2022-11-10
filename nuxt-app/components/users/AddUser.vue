<template>
  <v-dialog @click:outside="$emit('close')" :value="true">
    <v-card
      :loading="loading"
      :disabled="loading"
      tag="form"
      @submit.prevent="onSubmit"
    >
      <v-card-title> Crear un usuario </v-card-title>
      <v-card-text>
        <v-text-field label="Usuario" v-model="formData.user" />
        <v-text-field
          label="Contraseña"
          type="password"
          v-model="formData.password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" elevation="0" color="primary"> Submit </v-btn>
        <v-btn elevation="0"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddUser",
  data() {
    return {
      loading: false,
      formData: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      createUser: "users/createUser",
    }),
    async onSubmit(e) {
      try {
        this.loading = true;
        await this.createUser(this.formData);
        this.loading = false;
        this.$emit("close");
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
