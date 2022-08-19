<template>
  <v-card outlined>
    <v-card-text>
      <highchart :options="chartOptions" :modules="['exporting']" />
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import datasetStatsMixins from '@/mixins/datasetsStatsMixins'

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
      const data = []
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
      const keys = Object.keys(grouped)
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        data.push({ name: key, y: grouped[key] })
      }
      return data
    },
    chartOptions () {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Socios agrupados por edad'
        },
        tooltip: {
          pointFormat: '{point.percentage:.1f}%</b>'
        },
        /* accessibility: {
          point: {
            valueSuffix: '%'
          }
        }, */
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br />{point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Socios',
          colorByPoint: true,
          data: this.groupedByAge
        }]
      }
    }
  }
})
</script>
