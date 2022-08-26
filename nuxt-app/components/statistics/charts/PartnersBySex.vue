<template>
  <v-card outlined>
    <v-card-text>
      <highchart
        :options="chartOptions"
        :modules="['exporting']"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import datasetStatsMixins from '@/mixins/datasetsStatsMixins'
import { createChartOptions } from '@/utils/chartsOptions/pie'

export default Vue.extend({
  mixins: [datasetStatsMixins],
  computed: {
    groupedByAge () {
      const groupedBySex = _.groupBy(this.distinctUsers, 'sexo.name')
      return this.transformToArray(groupedBySex).map((a) => {
        a.y = a.y.length
        return a
      })
    },
    chartOptions () {
      return createChartOptions({
        seriesName: 'Socios',
        titleText: 'Socios agrupados por sexo',
        data: this.groupedByAge
      })
    }
  }
})
</script>
