import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from "apexcharts";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getChartData, updateStateChartData } from "../../../store/actions";

class ApexChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMounted: false,
            series: [{
                data: []
            }],
            options: {
                chart: {
                    id: `realtime-${props.waspmote_id}-${props.sensor_key}`,
                    height: 350,
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: props.sensor.unit,
                    align: 'left'
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime',
                    // range: XAXISRANGE,
                },
                yaxis: {
                    labels: {
                      formatter: function (value) {
                        return parseFloat(value).toFixed(2);
                      }
                    },
                },
                legend: {
                    show: false
                },
            },
        };
    }

    componentDidMount() {
        this.props.getChartData(this.props.history, this.props.waspmote_id, this.props.sensor_key, this.props.limit, this.props.sort);

        let intervalId = window.setInterval(() => {
            this.props.getChartData(this.props.history, this.props.waspmote_id, this.props.sensor_key, this.props.limit, this.props.sort);
        }, 5000);

        this.setState({ 
            intervalId: intervalId,
            isMounted: true 
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        
        const cloneData = Object.assign({}, this.props.data);

        if (typeof cloneData[this.props.waspmote_id] !== 'undefined' 
        && 
        typeof cloneData[this.props.waspmote_id][this.props.sensor_key] !== 'undefined') {
            cloneData[this.props.waspmote_id][this.props.sensor_key] = [];
        }

        this.props.updateStateChartData({
          data: {
              ...cloneData
          }
        });
    }


    render() {
        if (typeof this.props.data[this.props.waspmote_id] !== 'undefined' 
        && 
        typeof this.props.data[this.props.waspmote_id][this.props.sensor_key] !== 'undefined') {
            let chartData = this.props.data[this.props.waspmote_id][this.props.sensor_key];
            let newData = chartData.map(element => ({
                y: element.value,
                x: element.created_at
            }));

            if (this.state.isMounted) {
                ApexCharts.exec(`realtime-${this.props.waspmote_id}-${this.props.sensor_key}`, 'updateSeries', [{
                    data: newData
                }]);
            }
        }
        
        return (
            <React.Fragment>
                <div className="chart-container">
                    <div className="chart-header">
                        {this.props.sensor_key}
                    </div>
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStatetoProps = state => {
    return state.ChartData;
};
  
export default withRouter(connect(mapStatetoProps, { getChartData, updateStateChartData })(ApexChart));