<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          elevation="0"
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu de usuario
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ $auth.user?.user }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            text
            elevation="0"
            dark
            @click="logout"
          >
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
    hints: true
  }),
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
