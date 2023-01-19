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
  props: {
    multiple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      dataset: "stats/attentionsFiltered",
    }),
  }
}
</script>
