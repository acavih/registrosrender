export const createChartOptions = ({
  seriesName, titleText, data
}: any) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: titleText
  },
  tooltip: {
    pointFormat: '{point.percentage:.1f}%</b>'
  },
  /* accessibility: {
    point: {
      valueSuffix: '%'
    }
  }, */
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b><br />{point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: seriesName,
    colorByPoint: true,
    data
  }]
})
