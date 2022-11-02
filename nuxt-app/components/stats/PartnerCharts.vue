<template>
  <v-sheet>
    <v-row>
      <v-col cols="6">
        <partners-by-sex />
      </v-col>
      <v-col cols="6">
        <partners-by-partner-state />
      </v-col>
      <v-col cols="12">
        <partners-by-residency />
      </v-col>
      <v-col cols="12">
        <partners-by-nationality />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PartnersByNationality from "./charts/PartnersByNationality.vue";
import PartnersByPartnerState from "./charts/PartnersByPartnerState.vue";
import PartnersByResidency from "./charts/PartnersByResidency.vue";
import PartnersBySex from "./charts/PartnersBySex.vue";
export default {
  components: {
    PartnersBySex,
    PartnersByPartnerState,
    PartnersByNationality,
    PartnersByResidency,
  },
};
</script>

<style>
</style>
