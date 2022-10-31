<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Estadisticas </v-card-title>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "index.vue",
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  head() {
    return {
      title: "Estadisticas",
    };
  },
  async mounted() {
    await this.retrieveData();
  },
  computed: {
    ...mapState({
      rangeDateAttentions: (s) => s.attentions.rangeDateAttentions,
    }),
  },
  methods: {
    ...mapActions({
      getRangeDateAttentions: "attentions/getRangeDateAttentions",
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
