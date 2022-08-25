<template>
  <v-card>
    <v-card-title>
      Dataset
    </v-card-title>
    <v-card-text>
      <v-tabs v-model="currentTab">
        <v-tab>Listado de usuarios</v-tab>
        <v-tab>Atenciones</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <partners-table :partners="partners" :total-docs="partners.length" :loading="false" :options-table="options" />
        </v-tab-item>
        <v-tab-item>
          <attentions-iterator :options.sync="iteratorOptions" :attentions="attentions" />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import PartnersTable from '../partners/PartnersTable.vue'
export default Vue.extend({
  name: 'StatisticsDataset',
  components: { PartnersTable },
  props: {
    partners: {
      type: Array,
      default: () => ([]),
      required: true
    },
    attentions: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {
      currentTab: 0,
      options: {
        itemsPerPage: 20,
        page: 1
      },
      iteratorOptions: {
        page: 1,
        itemsPerPage: 20,
        sortBy: [], // string[],
        sortDesc: [], // boolean[],
        groupBy: [], // string[],
        groupDesc: [], // boolean[],
        multiSort: false, // boolean,
        mustSort: false // boolean
      }
    }
  }
})
</script>
