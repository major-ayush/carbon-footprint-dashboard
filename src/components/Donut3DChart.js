import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ highestEmission = 100, lowestEmission = 50, savings = 30 }) => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '<b>{point.name}: {point.y} KgCO2e</b>',
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      // Outer Ring (Highest Emission)
      {
        name: 'Highest Emission',
        size: '100%', // Full size for outer ring
        data: [{
          name: 'Highest Emission',
          y: highestEmission,
          color: '#FF0000', // Red
        }],
      },
      // Inner Ring (Lowest Emission + Savings)
      {
        name: 'Inner Ring',
        size: '80%',  // Smaller than outer ring
        innerSize: '50%', // Creates the donut hole
        data: [
          {
            name: 'Lowest Emission',
            y: lowestEmission,
            color: '#7CFC00', // Light Green
          },
          {
            name: 'Savings',
            y: savings,
            color: '#004d00', // Dark Green
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
