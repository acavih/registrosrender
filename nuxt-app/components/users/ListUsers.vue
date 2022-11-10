<template>
  <v-sheet>
    <v-card :disabled="loading">
      <v-card-title>
        Listado de usuarios
        <v-spacer />
        <v-btn @click="addingUser = true" color="primary" elevation="0"
          >Añadir usuario</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="usersList" :loading="loading">
          <template #[`item.actions`]="{ item }">
            <v-btn
              @click="restorePassword(item._id)"
              color="secondary"
              small
              elevation="0"
              >Reestablecer contraseña</v-btn
            >
            <v-btn
              @click="removeUser(item._id)"
              color="error"
              small
              elevation="0"
              >Eliminar usuario</v-btn
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <add-user @close="addingUser = false" v-if="addingUser" />
  </v-sheet>
</template>

<script>
import AddUser from "./AddUser.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "UsersPage",
  components: { AddUser },
  data() {
    return {
      loading: false,
      addingUser: false,
      headers: [
        { text: "Usuario", value: "user" },
        { text: "Acciones", value: "actions", align: "right" },
      ],
    };
  },
  computed: {
    ...mapState({
      usersList: (state) => state.users.usersList,
    }),
  },
  async mounted() {
    await this.retrieveData();
  },
  methods: {
    ...mapActions({
      retrieveUsers: "users/retrieveUsers",
      deleteUser: "users/deleteUser",
    }),
    async tryAuth(maxIntentos = 3, intentos = 1) {
      const helperText =
        intentos > 1 ? " (" + intentos + "/" + maxIntentos + ")" : "";
      const res = await this.$dialog.prompt({
        text: "¿Cual es tu contraseña?" + helperText,
        textField: {
          type: "password",
        },
      });
      if (!res) {
        return;
      }
      try {
        const result = await this.$axios.post("/auth/login", {
          user: this.$auth.user,
          password: res,
        });
        return result.status < 400;
      } catch (error) {
        await this.$dialog.error({
          title: "Error",
          text: "No te has autenticado correctamente",
        });
        return intentos < 3 ? this.tryAuth(maxIntentos, intentos + 1) : false;
      }
    },
    async restorePassword(userId) {
      const result = await this.tryAuth();
      alert(result);
    },
    async removeUser(userId) {
      const res = await this.$dialog.confirm({
        text: "¿De verdad quieres eliminar este usuario?",
      });
      if (!res) {
        return;
      }
      await this.deleteUser(userId);
      this.$dialog.notify.info("El usuario se eliminó correctamente", {
        position: "top-right",
        timeout: 5000,
      });
    },
    async retrieveData(e) {
      try {
        this.loading = true;
        await this.retrieveUsers();
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
