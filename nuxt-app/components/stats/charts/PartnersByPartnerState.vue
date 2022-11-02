<template>
  <v-card outlined>
    <v-card-text>
      <highchart :options="chartOptions" :modules="['exporting']" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { createPieChartOptions } from "../../../utils/charts/pie";
export default {
  computed: {
    ...mapGetters({
      users: "stats/distinctUsers",
    }),
    dataChart() {
      const grouped = this.users.reduce((acc, current) => {
        const sex = current.socioono.name;
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
      return createPieChartOptions({
        seriesName: "Socios",
        titleText: "Socios agrupados por socio o no",
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
