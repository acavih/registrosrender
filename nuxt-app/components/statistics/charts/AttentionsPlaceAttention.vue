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
import lodash from 'lodash'
import { createChartOptions } from '../../../utils/chartsOptions/bars'
import datasetStatsMixins from '../../../mixins/datasetsStatsMixins'

export default Vue.extend({
  mixins: [datasetStatsMixins],
  computed: {
    /**
     * Filtrar todas las atenciones que tengan formacion
     * Emparejar formacion y usuarios
     * Hacer uniq a usuarios y sacar su longitud
     * tranformarlo a array
     */
    data () {
      const attentionAttr = 'lugaratencion'
      /**
       * @type {import('registros-types').IAttention[]}
       */
      const attentions = this.attentionsDataset.filter(a => a[attentionAttr] !== null)
      const grouped = attentions.reduce((acc, current) => {
        const attentionElem = current[attentionAttr]
        if (typeof acc[attentionElem.name] !== 'undefined') {
          acc[attentionElem.name].push(current.user)
        } else {
          acc[attentionElem.name] = [current.user]
        }
        return acc
      }, { })
      const keys = Object.keys(grouped)
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        grouped[key] = lodash.uniqBy(grouped[key], '_id').length
      }
      return this.transformToArray(grouped)
    },
    chartOptions () {
      return createChartOptions({
        seriesName: 'Lugar de atencion',
        titleText: 'Atenciones por lugar de atencion',
        data: this.data,
        chartType: 'bar'
      })
    }
  }
})
</script>
