<template>
  <v-app v-if="loaded">
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      :width="$route.path.includes('/admin/statistics') ? 500 : 300"
      app
    >
      <v-list>
        <v-list-item :to="'/admin/partners'" router>
          <v-list-item-content>
            <v-list-item-title v-text="'Socios'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/admin/attentions'" router>
          <v-list-item-content>
            <v-list-item-title v-text="'Ultimas atenciones'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/admin/statistics'" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="'Estadísticas'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/admin/resources'" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="'Recursos'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-if="$route.path.includes('/admin/statistics')">
        <v-divider />
        <stats-filter />
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="cursor: pointer;" @click="$router.push('/admin/dashboard')" v-text="title" />
      <v-spacer />
      <user-menu-component />
    </v-app-bar>
    <v-main>
      <template v-if="$auth.loggedIn">
        <v-container fluid>
          <Nuxt />
        </v-container>
      </template>
      <template v-else>
        {{ $auth.loggedIn }}
        <redirect-component :url="'/'" />
      </template>
    </v-main>
  </v-app>
</template>

<script>
import UserMenuComponent from "~/components/auth/UserMenuComponent.vue";
import RedirectComponent from "~/components/RedirectComponent.vue";

export default {
  name: "DefaultLayout",
  components: { RedirectComponent, UserMenuComponent },
  data() {
    return {
      loaded: false,
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Registros",
    };
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 500);
  },
};
</script>

<style>
aa {
  color: "#fff454";
}
</style>
