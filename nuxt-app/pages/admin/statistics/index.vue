<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Estadísticas </v-card-title>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
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
