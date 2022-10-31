<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Estadisticas </v-card-title>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "StatsPage",
  data() {
    return {
      loading: false,
      data: [],
      filters: {
        partners: {
          sexo: [],
          socioono: [],
          nacionalidad: [],
          ciudadresidencia: [],
        },
        attentions: {
          tipoaenciones: [],
          derivadoa: [],
          derivadode: [],
          Proyectos: [],
          motivosatencion: [],
          formacion: [],
          voluntariado: [],
        },
      },
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
    filteredAttentions() {
      return this.$store.getters["stats/filterAttentions"]({
        filters: this.filters,
      });
    },
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
