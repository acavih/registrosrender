<template>
  <v-card outlined>
    <v-card-text>
      <highchart :options="chartOptions" :modules="['exporting']" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import chartMixin from '@/mixins/chart.js'

export default {
  mixins: [chartMixin],
  computed: {
    ...mapGetters({
      dataset: "stats/uniqUsers",
    })
  }
}
</script>
