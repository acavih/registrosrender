<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn elevation="0" color="accent" light v-bind="attrs" v-on="on">
          Menu de usuario
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ $auth.user }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-card-actions>
          <v-btn
            icon
            color="secondary"
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-icon>
              {{
                $vuetify.theme.dark
                  ? "mdi-white-balance-sunny"
                  : "mdi-weather-night"
              }}
            </v-icon>
          </v-btn>
          <v-spacer />
          <v-btn elevation="0" text to="/admin/profile">
            Página de perfil
          </v-btn>
          <v-btn color="error" text elevation="0" dark @click="logout">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  mounted() {
    const hours = new Date().getHours();
    if (!(hours > 8 && hours < 20)) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>
