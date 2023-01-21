<template>
  <v-sheet>
    <v-row>
      <v-col>
        <charts-panel />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import StatsFilter from '@/components/stats/StatsFilter.vue'
import ChartsPanel from '@/components/stats/ChartsPanel.vue'
export default {
  components: { StatsFilter, ChartsPanel },
  head() {
    return {
      title: "Estadísticas"
    }
  }
}
</script>
