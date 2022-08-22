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
          Listado de usuarios
        </v-tab-item>
        <v-tab-item>
          Listado de atenciones
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'StatisticsDataset',
  data () {
    return {
      currentTab: 0
    }
  }
})
</script>
