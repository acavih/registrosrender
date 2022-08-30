<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" right width="380px" app :clipped="clipped">
      <stats-sidebar />
    </v-navigation-drawer>
    <v-app-bar
      color="primary"
      :clipped-right="clipped"
      dark
      fixed
      app
    >
      <v-btn icon to="/admin/partners">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <template v-if="$auth.loggedIn">
        <v-sheet class="ma-5">
          <Nuxt />
        </v-sheet>
      </template>
      <template v-else>
        <v-container>
          <redirect-component :url="'/admin'" />
        </v-container>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import StatsSidebar from '../components/statistics/StatsSidebar.vue'
import RedirectComponent from '~/components/RedirectComponent.vue'
export default {
  name: 'DefaultLayout',
  components: { RedirectComponent, StatsSidebar },
  data () {
    return {
      clipped: true,
      drawer: true,
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
