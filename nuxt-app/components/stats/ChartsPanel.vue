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
      <partner-chart :attribute="'sex'" :typeChart="'pie'" />
      <partner-chart :attribute="'socioono'" :typeChart="'columnBar'" />
      <partner-chart :attribute="'nacionalidad'" :typeChart="'columnBar'" />
      <partner-chart :attribute="'ciudadresidencia'" :typeChart="'columnBar'" />
      <partner-chart :attribute="'howDidKnowUs'" :typeChart="'columnBar'" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PartnerChart from './charts/PartnerChart.vue';
export default {
  components: { PartnerChart },
  computed: {
    ...mapGetters('stats', ['attentionsFiltered', 'uniqUsers'])
  }
}
</script>
