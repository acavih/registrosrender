<template>
  <v-card>
    <v-card-title>
      Graficos
      <v-spacer />
      <view-attentions-button :disabled="attentionsFiltered.length === 0" />
      <view-users-button :disabled="uniqUsers.length === 0" />
    </v-card-title>
    <v-card-text>
      <v-tabs v-model="currentTab">
        <v-tab>Socios</v-tab>
        <v-tab>Atenciones</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <template v-for="chart in chartsToDraw.partners">
            <partner-chart v-bind="chart" />
          </template>
        </v-tab-item>
        <v-tab-item>
          <template v-for="chart in chartsToDraw.attentions">
            <attention-chart v-bind="chart" />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PartnerChart from './charts/PartnerChart.vue';
import {mapState} from 'vuex'
import AttentionChart from './charts/AttentionChart.vue';
import ViewAttentionsButton from './dataset/ViewAttentionsButton.vue';
import ViewUsersButton from './dataset/ViewUsersButton.vue';
export default {
  components: { PartnerChart, AttentionChart, ViewAttentionsButton, ViewUsersButton },
  data () {
    return {
      currentTab: 0
    }
  },
  computed: {
    ...mapGetters('stats', ['attentionsFiltered', 'uniqUsers']),
    ...mapState('stats', ['chartsToDraw'])
  }
}
</script>
