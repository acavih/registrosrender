<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        Pagina inicial
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <template v-if="!$auth.loggedIn">
          <Nuxt />
        </template>
        <v-btn to="/admin/users">Ir a users</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'GuestLayout'
}
</script>
