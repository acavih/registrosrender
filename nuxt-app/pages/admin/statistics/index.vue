<template>
  <v-sheet>
    <v-card :loading="loading" :disabled="loading">
      <v-card-title>
        Graficos
        <v-spacer />
        <v-btn color="secondary" class="mr-5" elevation="0" @click="showCharts = false">
          Actualizar
        </v-btn>
        <v-btn color="primary" elevation="0" @click="showingDatasets = true">
          Ver datasets
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert class="statsDescription" color="primary" dark>
          Viendo resultados de <strong>{{ rangeDates[0] }}</strong> a <strong>{{ rangeDates[1] }}</strong>
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
import statisticsDataset from '@/components/statistics/dataset.vue'

export default Vue.extend({
  name: 'StatisticsIndex',
  components: {
    statisticsDataset,
    ChartsPartner,
    ChartsPartnerActivities
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
      // rangeDate: lastMonth,
      rangePredefinedDates: [
        { val: getRange(1, 'week'), text: 'Último semana' },
        { val: lastMonth, text: 'Último mes' },
        { val: getRange(3, 'month'), text: 'Último trimestre' },
        { val: getRange(1, 'year'), text: 'Último año' }
      ],
      showCharts: true,
      loading: false
    }
  },
  computed: {
    ...mapState('statistics', ['attentionsDataset', 'rangeDates']),
    ...mapGetters('statistics', ['distinctUsers', 'filteredAttentions'])
  },
  watch: {
    rangeDates: 'refreshDataset',
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
      if (this.rangeDates.length !== 2) { return }
      this.loading = true
      const [startDate, endDate] = this.rangeDates
      const attentions = await this.$axios.get('/attentions/dataset', {
        params: { startDate, endDate }
      })

      this.setAttentions(attentions.data.payload.attentions)
      this.loading = false
    }
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
