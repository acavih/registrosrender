<template>
  <v-app>
    <v-app-bar fixed app color="primary" dark>
      <v-toolbar-title> Pagina inicial </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <template v-if="!$auth.loggedIn">
          <Nuxt />
        </template>
        <redirect-component v-else :url="'/admin/dashboard'" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RedirectComponent from "../components/RedirectComponent.vue";
export default {
  components: { RedirectComponent },
  name: "GuestLayout",
};
</script>
