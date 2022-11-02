<template>
  <v-card outlined>
    <v-card-text>
      <highchart :options="chartOptions" :modules="['exporting']" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { createBarChartOptions } from "../../../utils/charts/bars";
export default {
  computed: {
    ...mapGetters({
      attentions: "stats/filteredAttentions",
    }),
    dataChart() {
      const grouped = this.attentions.reduce((acc, current) => {
        const items = current.derivadode;
        items.forEach((element) => {
          const itemName = element.name;
          if (acc[itemName]) {
            acc[itemName] += 1;
          } else {
            acc[itemName] = 1;
          }
        });
        return acc;
      }, {});

      return this.transformToArray(grouped);
    },
    chartOptions() {
      return createBarChartOptions({
        seriesName: "Socios",
        titleText: "Atenciones agrupadas por derivado de",
        data: this.dataChart,
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
  },
};
</script>

<style>
</style>
