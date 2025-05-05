import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ title, labels, data }) => {
  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: title
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      pie: {
        innerSize: '40%', // Creates the donut effect
        dataLabels: {
          enabled: false // Disable data labels
        }
      }
    },
    colors: ['#006400', '#ff0000'], // Dark green and dark red
    series: [{
      name: 'Carbon Emmision in (KgCO2e)',
      data: labels.map((label, index) => ({
        name: label,
        y: data[index]
      })),
      showInLegend: true,
      dataLabels: {
        enabled: false // Disable data labels
      }
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
