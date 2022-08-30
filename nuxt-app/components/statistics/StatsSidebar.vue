<template>
  <v-card elevation="0" :loading="loading">
    <v-card-title>
      Filtros
    </v-card-title>
    <v-card-text>
      <v-chip-group v-model="activeRangeDate" active-class="grey darken-3 white--text" column>
        <v-chip v-for="range in rangePredefinedDates" :key="range.text" small @click="rangeDate = range.val">
          {{ range.text }}
        </v-chip>
      </v-chip-group>
      <v-date-picker v-model="rangeDate" full-width range />
      <filters-charts v-model="statsFilters" />
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import dayjs from 'dayjs'
import FiltersCharts from './FiltersCharts.vue'

export default Vue.extend({
  name: 'StatisticsIndex',
  components: {
    FiltersCharts
  },
  layout: 'stats',
  data () {
    const getRange = (ammount, unit) => ([
      dayjs().subtract(ammount, unit).format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ])
    const lastMonth = getRange(1, 'month')
    return {
      currentTab: 0,
      showingDatasets: false,
      activeRangeDate: 1,
      rangeDate: lastMonth,
      rangePredefinedDates: [
        { val: getRange(1, 'week'), text: 'Último semana' },
        { val: lastMonth, text: 'Último mes' },
        { val: getRange(3, 'month'), text: 'Último trimestre' },
        { val: getRange(1, 'year'), text: 'Último año' }
      ],
      showCharts: true,
      statsFilters: {},
      loading: false
    }
  },
  computed: {
    // ...mapState('statistics', ['attentionsDataset']),
    // ...mapGetters('statistics', ['distinctUsers', 'filteredAttentions'])
  },
  watch: {
    // rangeDate: 'refreshDataset',
    rangeDate () {
      this.setRangeDate(this.rangeDate)
    }
  },
  mounted () {
    this.setRangeDate(this.rangeDate)
  },
  methods: {
    ...mapMutations('statistics', ['setRangeDate'])
  }
})
</script>

<style scoped>
.statsDescription {
  position: sticky;
  top: 63px;
  z-index: 200;
}
</style>
