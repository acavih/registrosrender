<template>
  <v-sheet>
    <v-row>
      <v-col>
        <v-card :loading="loading" :disabled="loading">
          <v-card-title>
            Graficos
            <v-spacer />
            <v-btn color="primary" elevation="0" @click="showingDatasets = true">
              Ver datasets
            </v-btn>
            <v-btn color="primary" elevation="0" @click="showCharts = false">
              Actualizar
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert color="primary" dark>
              Viendo resultados de <strong>{{ rangeDate[0] }}</strong> a <strong>{{ rangeDate[1] }}</strong>
              ({{ filteredAttentions.length }} atenciones y {{ distinctUsers.length }} usuarios)
            </v-alert>
            <template v-if="showCharts">
              <v-tabs v-model="currentTab" class="mb-5">
                <v-tab>Socios</v-tab>
                <v-tab>Actividad de socios</v-tab>
              </v-tabs>
              <v-tabs-items v-model="currentTab">
                <v-tab-item>
                  <charts-partner />
                </v-tab-item>
                <v-tab-item>
                  <charts-partner-activities />
                </v-tab-item>
              </v-tabs-items>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card :loading="loading">
          <v-card-title>
            Filtros
          </v-card-title>
          <v-card-text>
            <v-chip-group column>
              <v-chip v-for="range in rangePredefinedDates" :key="range.text" small @click="rangeDate = range.val">
                {{ range.text }}
              </v-chip>
            </v-chip-group>
            <v-date-picker v-model="rangeDate" full-width range />
            <filters-charts v-model="statsFilters" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showingDatasets">
      <statistics-dataset :partners="distinctUsers" :attentions="attentionsDataset" />
    </v-dialog>
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import ChartsPartner from '../../../components/statistics/ChartsPartner.vue'
import ChartsPartnerActivities from '../../../components/statistics/ChartsPartnerActivities.vue'
import FiltersCharts from '../../../components/statistics/FiltersCharts.vue'
import statisticsDataset from '@/components/statistics/dataset.vue'

export default Vue.extend({
  name: 'StatisticsIndex',
  components: {
    statisticsDataset,
    ChartsPartner,
    ChartsPartnerActivities,
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
      currentTab: 1,
      showingDatasets: false,
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
    ...mapState('statistics', ['attentionsDataset']),
    ...mapGetters('statistics', ['distinctUsers', 'filteredAttentions'])
  },
  watch: {
    rangeDate: 'refreshDataset',
    showCharts () {
      if (!this.showCharts) {
        setTimeout(() => {
          this.showCharts = true
        }, 500)
      }
    }
  },
  async mounted () {
    await this.refreshDataset()
  },
  methods: {
    ...mapMutations('statistics', ['setAttentions']),
    async refreshDataset () {
      if (this.rangeDate.length !== 2) { return }
      this.loading = true
      const [startDate, endDate] = this.rangeDate
      const attentions = await this.$axios.get('/attentions/dataset', {
        params: { startDate, endDate }
      })

      this.setAttentions(attentions.data.payload.attentions)
      this.loading = false
    }
  }
})
</script>
