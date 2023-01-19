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
  computed: {
    dataChart() {
      const grouped = this.dataset.reduce((acc, current) => {
        if (!current[this.attribute]) return acc

        if (this.multiple) {
          current[this.attribute].forEach((element) => {
            const itemName = element.name;
            if (acc[itemName]) {
              acc[itemName] += 1;
            } else {
              acc[itemName] = 1;
            }
          });
        } else {
          const elem = current[this.attribute].name;
          if (acc[elem]) {
            acc[elem] += 1;
          } else {
            acc[elem] = 1;
          }
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
