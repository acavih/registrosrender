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
import { createChartOptions } from '@/utils/chartsOptions/bars'

export default Vue.extend({
  mixins: [datasetStatsMixins],
  computed: {
    groupedByNacionalidad () {
      const groupedBySocioono = _.groupBy(this.distinctUsers, 'ciudadresidencia.name')
      return this.transformToArray(groupedBySocioono).map((a) => {
        a.y = a.y.length
        return a
      })
    },
    chartOptions () {
      return createChartOptions({
        seriesName: 'Socios',
        titleText: 'Socios agrupados por residencia',
        data: this.groupedByNacionalidad
      })
    }
  }
})
</script>
