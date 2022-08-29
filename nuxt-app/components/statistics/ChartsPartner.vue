<template>
  <v-row>
    <v-col :cols="4">
      <partners-by-sex />
    </v-col>
    <v-col :cols="4">
      <partners-by-age />
    </v-col>
    <v-col :cols="4">
      <partners-by-socioono />
    </v-col>
    <v-col :cols="12">
      <partners-by-nationality />
    </v-col>
    <v-col :cols="12">
      <partners-by-residency />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import PartnersByAge from './charts/PartnersByAge.vue'
import PartnersByNationality from './charts/PartnersByNationality.vue'
import PartnersByResidency from './charts/PartnersByResidency.vue'
import PartnersBySex from './charts/PartnersBySex.vue'
import PartnersBySocioono from './charts/PartnersBySocioono.vue'

export default Vue.extend({
  components: {
    PartnersBySex,
    PartnersByAge,
    PartnersBySocioono,
    PartnersByNationality,
    PartnersByResidency

  }
})
</script>
