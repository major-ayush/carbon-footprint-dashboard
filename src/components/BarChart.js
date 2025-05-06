import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CarbonEmissionsChart = ({ highestEmission, lowestEmission }) => {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Carbon Emissions'
        },
        xAxis: {
            categories: ['Highest Emission', 'Lowest Emission']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Carbon Emissions in KgCO2e'
            }
        },
        legend: {
            enabled: false // Disable the legend
        },
        plotOptions: {
            column: {
                pointPadding: 0.01, // Decrease padding between bars
                groupPadding: 0.01, // Decrease padding between groups
                pointWidth: 60 // Set a specific width for the columns
            },
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' KgCO2e'; // Display the emission value with the unit
                    },
                    style: {
                        fontSize: '20px' // Set the font size for the line data labels
                    },
                    x: 10, // Move the label to the right
                    y: -5  // Move the label up slightly
                }
            }
        },
        series: [{
            name: 'Emissions in KgCO2e: ',
            data: [
                { y: highestEmission, color: 'red' },   // Highest emission
                { y: lowestEmission, color: 'green' }    // Lowest emission
            ]
        }, {
            type: 'line',
            name: '', // Remove label from the line series
            data: [
                [0, highestEmission], // Highest emission point
                [1, lowestEmission]   // Lowest emission point
            ],
            marker: {
                enabled: false
            },
            lineWidth: 1,
            color: 'black',
            enableMouseTracking: false,
            dataLabels: {
                enabled: true,
                formatter: function() {
                    return this.y + ' KgCO2e'; // Display the emission value with the unit for the line
                },
                style: {
                    fontSize: '10px' // Set the font size for the line data labels
                },
                x: 10, // Move the label to the right
                y: -5  // Move the label up slightly
            }
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default CarbonEmissionsChart;
