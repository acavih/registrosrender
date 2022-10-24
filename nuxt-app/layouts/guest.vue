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
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'GuestLayout'
}
</script>
