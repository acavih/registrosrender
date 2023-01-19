export const pie = ({
  seriesName, titleText, data
}) => ({
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

export const columnBar = ({
  seriesName, titleText, data
}) => ({
  chart: {
    type: 'column'
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
        format: '{point.y}'
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
