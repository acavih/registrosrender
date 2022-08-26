export const createChartOptions = ({
  seriesName, titleText, data, chartType = 'column'
}: any) => ({
  chart: {
    type: chartType
    // height: '1500px'
  },
  title: {
    align: 'left',
    text: titleText
  },
  accessibility: {
    announceNewData: {
      enabled: true
    }
  },
  xAxis: {
    type: 'category'
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y:.1f}%'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  series: [
    {
      name: seriesName,
      colorByPoint: true,
      data
    }
  ]
})
