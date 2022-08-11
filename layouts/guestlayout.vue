<template>
  <v-app>
    <v-app-bar
      color="primary"
      :clipped-left="clipped"
      dark
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <template v-if="$auth.loggedIn">
        <redirect-component :url="'/admin'" />
      </template>
      <template v-else>
        <v-container>
          <Nuxt />
        </v-container>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import RedirectComponent from '~/components/RedirectComponent.vue'
export default {
  name: 'DefaultLayout',
  components: { RedirectComponent },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Registros'
    }
  }
}
</script>
