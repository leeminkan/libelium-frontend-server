import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
    
    render() {
        const data = {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.label,
                    fill: true,
                    data: this.props.data
                },
            ]
        };
        var option = {
            scales: {
                // xAxes: [{
                //     ticks: {
                //         autoSkip: true,
                //         maxTicksLimit: 2
                //     }
                // }],
                // xAxes: [{
                //     ticks: {
                //         display: false //this will remove only the label
                //     }
                // }],
                xAxes: [{
                    display: false //this will remove all the x-axis grid lines
                }]
            }
        }
        return (
            <React.Fragment>
                <Line width={600} height={245} data={data} options={option} />
            </React.Fragment>
        );
    }
}

export default LineChart;