<template>
  <v-card outlined>
    <v-card-text>
      <highchart
        :options="chartOptions"
        :update="['options.series']"
        :modules="['exporting']"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import datasetStatsMixins from '@/mixins/datasetsStatsMixins'
import { createChartOptions } from '@/utils/chartsOptions/pie'

const ranges = [
  [0, 20],
  [21, 40],
  [41, 60],
  [61, 80],
  [81, 80],
  [101, 120]
]

export default Vue.extend({
  mixins: [datasetStatsMixins],
  computed: {
    groupedByAge () {
      const grouped = this.distinctUsers.reduce((result, current) => {
        for (let index = 0; index < ranges.length; index++) {
          const range = ranges[index]
          const [min, max] = range
          if (current.edad > min && current.edad < max) {
            const key = range.join('-')
            if (!result[key]) { result[key] = 1 } else { result[key] += 1 }
            continue
          }
        }
        return result
      }, { })
      return this.transformToArray(grouped)
    },
    chartOptions () {
      return createChartOptions({
        seriesName: 'Socios',
        titleText: 'Socios agrupados por edad',
        data: this.groupedByAge
      })
    }
  }
})
</script>
