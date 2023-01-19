<template>
  <v-card>
    <v-card-title>
      Graficos
      <v-spacer />
      <v-btn color="primary" elevation="0">
        Atenciones ({{attentionsFiltered.length}})
      </v-btn>
      <v-btn color="primary" elevation="0" style="margin-left: 10px;">
        Usuarios ({{uniqUsers.length}})
      </v-btn>
    </v-card-title>
    <v-card-text>
      <template v-for="chart in chartsToDraw.partners">
        <partner-chart v-bind="chart" />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PartnerChart from './charts/PartnerChart.vue';
import {mapState} from 'vuex'
export default {
  components: { PartnerChart },
  computed: {
    ...mapGetters('stats', ['attentionsFiltered', 'uniqUsers']),
    ...mapState('stats', ['chartsToDraw'])
  }
}
</script>
