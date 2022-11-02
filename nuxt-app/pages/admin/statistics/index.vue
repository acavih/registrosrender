<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      <v-btn icon @click="$store.commit('stats/toggleDrawer')">
        <v-icon> mdi-xml </v-icon>
      </v-btn>
      Estadísticas
      <v-spacer />
      <v-btn elevation="0" color="primary" class="mr-5">
        Usuarios
        <v-chip small class="ml-2" color="secondary">
          {{ distinctUsers.length }}
        </v-chip>
      </v-btn>
      <v-btn elevation="0" color="primary">
        Atenciones
        <v-chip small class="ml-2" color="secondary">{{
          filteredAttentions.length
        }}</v-chip>
      </v-btn>
    </v-card-title>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "StatsPage",
  layout: "stats",
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  head() {
    return {
      title: "Estadísticas",
    };
  },
  async mounted() {
    await this.retrieveData();
  },
  computed: {
    ...mapState({
      rangeDateAttentions: (s) => s.attentions.rangeDateAttentions,
    }),
    ...mapGetters({
      distinctUsers: "stats/distinctUsers",
    }),
    filteredAttentions() {
      return this.$store.getters["stats/filteredAttentions"];
    },
  },
  methods: {
    ...mapActions({
      getRangeDateAttentions: "attentions/getRangeDateAttentions",
    }),
    ...mapMutations({
      updateFilters: "stats/updateFilters",
    }),
    async retrieveData(e) {
      try {
        this.loading = true;
        await this.getRangeDateAttentions();
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
