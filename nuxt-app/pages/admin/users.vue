<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Listado de usuarios </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="usersList" :loading="loading">
        <template #[`item.actions`]="{item}">
          <v-btn small elevation="0">Editar</v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "UsersPage",
  data() {
    return {
      loading: false,
      headers: [
        { text: "Uusario", value: "user" },
        { text: "Acciones", value: "actions" }
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
      usersList: (state) => state.users.usersList
    })
  },
  async mounted() {
    await this.retrieveData();
  },
  methods: {
    ...mapActions({
      retrieveUsers: 'users/retrieveUsers'
    }),
    async retrieveData(e) {
      try {
        this.loading = true;
        await this.retrieveUsers()
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
