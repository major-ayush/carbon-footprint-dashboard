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
      text: "Highest vs Lowest Carbon Emissions",
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
        innerSize: '40%', // Adjust innerSize for outer ring width
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        states: {
          hover: {
            brightness: 0 // Prevent color change on hover
          }
        }
      },
    },
    series: [
      {
        name: 'Highest Emission',
        size: '100%',
        innerSize: '40%', // Set innerSize to increase outer ring width
        data: [{
          name: 'Highest Emission',
          y: highestEmission,
          color: '#FF0000', // Red
        }],
      },
      {
        name: 'Inner Ring',
        size: '70%',
        innerSize: '50%',
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
