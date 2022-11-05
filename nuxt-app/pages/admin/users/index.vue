<template>
  <v-sheet>
    <v-card :disabled="loading">
      <v-card-title>
        Listado de usuarios
        <v-spacer />
        <v-btn color="primary" elevation="0" to="/admin/users/add"
          >Añadir usuario</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="usersList" :loading="loading">
          <template #[`item.actions`]="{ item }">
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
    <nuxt />
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: { redirect },
  name: "UsersPage",
  data() {
    return {
      loading: false,
      headers: [
        { text: "Usuario", value: "user" },
        { text: "Acciones", value: "actions", align: "right" },
      ],
    };
  },
  head() {
    return {
      title: "Listado de usuarios",
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
