<template>
  <v-card :loading="refreshingAttentions" :disabled="refreshingAttentions">
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
    <v-card-text>
      <v-tabs v-model="currentTab">
        <v-tab>Socios</v-tab>
        <v-tab>Atenciones</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item> <partner-charts /> </v-tab-item>
        <v-tab-item> <attention-charts /> </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import AttentionCharts from "../../../components/stats/AttentionCharts.vue";
import PartnerCharts from "../../../components/stats/PartnerCharts.vue";
export default {
  components: { PartnerCharts, AttentionCharts },
  name: "StatsPage",
  layout: "stats",
  data() {
    return {
      currentTab: 1,
      loading: false,
      data: [],
    };
  },
  head() {
    return {
      title: "Estadísticas",
    };
  },
  computed: {
    ...mapState({
      rangeDateAttentions: (s) => s.attentions.rangeDateAttentions,
      refreshingAttentions: (s) => s.stats.loading,
    }),
    ...mapGetters({
      distinctUsers: "stats/distinctUsers",
    }),
    filteredAttentions() {
      return this.$store.getters["stats/filteredAttentions"];
    },
  },
  methods: {
    ...mapMutations({
      updateFilters: "stats/updateFilters",
    }),
  },
};
</script>
