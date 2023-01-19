<template>
  <v-card outlined>
    <v-card-text>
      <v-tabs v-model="currentTab">
        <v-tab>Socios</v-tab>
        <v-tab>Atenciones</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <v-row>
            <v-col cols="12">
              <highchart :options="chartOptions" :modules="['exporting']" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          Atenciones
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import * as typeCharts from '@/utils/charts/createChartOptions'

export default {
  props: {
    attribute: {
      type: String,
      required: true
    },
    typeChart: {
      type: String,
      required: true
    },
    chartOptionsAttrs: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentTab: 0
    }
  },
  computed: {
    ...mapGetters({
      users: "stats/uniqUsers",
    }),
    dataChart() {
      const grouped = this.users.reduce((acc, current) => {
        if (!current[this.attribute]) return acc
        const sex = current[this.attribute].name;
        if (acc[sex]) {
          acc[sex] += 1;
        } else {
          acc[sex] = 1;
        }
        return acc;
      }, {});
      return this.transformToArray(grouped);
    },
    chartOptions() {
      return typeCharts[this.typeChart]({
        ...this.chartOptionsAttrs,
        data: this.dataChart
      });
    },
  },
   methods: {
    transformToArray(obj) {
      const data = [];
      const keys = Object.keys(obj);
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        data.push({ name: key, y: obj[key] });
      }
      return data;
    },
  }
}
</script>
