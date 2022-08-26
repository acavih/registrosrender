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
            <v-alert color="primary" dark>
              Viendo resultados de {{ attentionsDataset.length }} atenciones y {{ distinctUsers.length }} usuarios
            </v-alert>
            <v-tabs v-model="currentTab" class="mb-5">
              <v-tab>Socios</v-tab>
              <v-tab>Actividad de socios</v-tab>
            </v-tabs>
            <v-tabs-items v-model="currentTab">
              <v-tab-item>
                <v-row>
                  <v-col :cols="4">
                    <partners-by-sex />
                  </v-col>
                  <v-col :cols="4">
                    <partners-by-age />
                  </v-col>
                  <v-col :cols="4">
                    <partners-by-socioono />
                  </v-col>
                  <v-col :cols="12">
                    <partners-by-nationality />
                  </v-col>
                  <v-col :cols="12">
                    <partners-by-residency />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col :cols="6">
                    <attentions-derivadoa />
                  </v-col>
                  <v-col :cols="6">
                    <attentions-derivadode />
                  </v-col>
                  <v-col :cols="6">
                    <attentions-type-attention />
                  </v-col>
                  <v-col :cols="6">
                    <attentions-proyectos />
                  </v-col>
                  <v-col :cols="12">
                    <attentions-place-attention />
                  </v-col>
                  <v-col :cols="12">
                    <attentions-formation />
                  </v-col>
                  <v-col :cols="12">
                    <attentions-voluntariado />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
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
      <statistics-dataset :partners="distinctUsers" :attentions="attentionsDataset" />
    </v-dialog>
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
import AttentionsFormation from '../../../components/statistics/charts/AttentionsFormation.vue'
import AttentionsTypeAttention from '../../../components/statistics/charts/AttentionsTypeAttention.vue'
import AttentionsDerivadoa from '../../../components/statistics/charts/AttentionsDerivadoa.vue'
import AttentionsDerivadode from '../../../components/statistics/charts/AttentionsDerivadode.vue'
import AttentionsProyectos from '../../../components/statistics/charts/AttentionsProyectos.vue'
import AttentionsVoluntariado from '../../../components/statistics/charts/AttentionsVoluntariado.vue'
import AttentionsPlaceAttention from '../../../components/statistics/charts/AttentionsPlaceAttention.vue'
import PartnersByResidency from '../../../components/statistics/charts/PartnersByResidency.vue'
import statisticsDataset from '@/components/statistics/dataset.vue'
import PartnersByAge from '@/components/statistics/charts/PartnersByAge.vue'
import PartnersBySex from '~/components/statistics/charts/PartnersBySex.vue'
import PartnersBySocioono from '~/components/statistics/charts/PartnersBySocioono.vue'
import PartnersByNationality from '~/components/statistics/charts/PartnersByNationality.vue'
export default Vue.extend({
  name: 'StatisticsIndex',
  components: {
    statisticsDataset,
    AttentionsDerivadoa,
    PartnersByAge,
    PartnersBySex,
    PartnersBySocioono,
    PartnersByNationality,
    AttentionsFormation,
    AttentionsTypeAttention,
    AttentionsDerivadode,
    AttentionsProyectos,
    AttentionsVoluntariado,
    AttentionsPlaceAttention,
    PartnersByResidency
  },
  layout: 'stats',
  data () {
    return {
      currentTab: 1,
      showingDatasets: false,
      rangeDate: [
        '2021-06-01',
        '2022-08-30'
      ],
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
