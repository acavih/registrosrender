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
          </v-card-title>
          <v-card-text>
            <v-alert>
              Viendo resultados de {{ attentionsDataset.length }} atenciones y {{ distinctUsers.length }} usuarios
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card :loading="loading">
          <v-card-title>
            Filtros
          </v-card-title>
          <v-card-text>
            <v-date-picker v-model="rangeDate" range />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showingDatasets">
      <statistics-dataset />
    </v-dialog>
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
import statisticsDataset from '@/components/statistics/dataset.vue'
export default Vue.extend({
  name: 'StatisticsIndex',
  components: { statisticsDataset },
  data () {
    return {
      showingDatasets: false,
      rangeDate: [],
      loading: false
    }
  },
  computed: {
    ...mapState('statistics', ['attentionsDataset']),
    ...mapGetters('statistics', ['distinctUsers'])
  },
  watch: {
    rangeDate: 'refreshDataset'
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
