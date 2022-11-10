<template>
  <v-sheet>
    <v-card elevation="0" color="transparent">
      <v-card-title> Página de perfil </v-card-title>
      <v-card-text>
        <p>Tu usuario es: {{ $auth.user }}</p>
        <v-card tag="form" @submit.prevent="changePassword">
          <v-card-title> Cambiar la contraseña </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="data.currentPassword"
              label="Contraseña actual"
              type="password"
            />
            <v-text-field
              v-model="data.newPassword"
              label="Nueva contraseña"
              type="password"
            />
            <v-text-field
              v-model="data.confirmNewPassword"
              label="Confirme nueva contraseña"
              type="password"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn elevation="0" color="primary" type="submit">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "profile.vue",
  head() {
    return {
      title: "perfil",
    };
  },
  data() {
    return {
      data: {
        newPassword: "",
        confirmNewPassword: "",
        currentPassword: "",
      },
    };
  },
  mounted() {},
  methods: {
    async changePassword() {
      if (this.data.newPassword !== this.data.confirmNewPassword) {
        return this.$dialog.error({
          title: "Atención",
          text: "Las contraseñas no son iguales",
        });
      }
      const payload = {
        currentPassword: this.data.currentPassword,
        newPassword: this.data.newPassword,
        user: this.$auth.user,
      };

      try {
        const response = await this.$axios.put("/auth/changePassword", payload);
        this.data.newPassword = "";
        this.data.confirmNewPassword = "";
        this.data.currentPassword = "";
        return this.$dialog.info({
          title: "Resultado:",
          text: response.data.message,
        });
      } catch (error) {
        if (error.isAxiosError) {
          return this.$dialog.error({
            title: "Atención",
            text: error.response.data.message,
          });
        }
        console.dir(error);
        return this.$dialog.error({
          title: "Atención",
          text: "Error desconocido",
        });
      }
    },
  },
};
</script>
