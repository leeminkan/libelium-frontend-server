import React, { Component } from 'react';
import LineChart from './linechart';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getChartData } from "../../../store/actions";

class DoubleChart extends Component {

    componentDidMount() {
      this.props.getChartData(this.props.history, this.props.waspmote_id, this.props.sensor_key, this.props.limit, this.props.sort);
    }

    render() {
        let data = [];
        let label = this.props.label;
        let labels = [];
        let data2 = [];
        let labels2 = [];
        const lineOptions = {
            pointRadius: 1,
            pointHoverRadius: 1
        };
        const options = {
            legend: {
               display: false
            },
            tooltips: {
               enabled: true
            }
       };
        if (typeof this.props.data[this.props.waspmote_id] !== 'undefined' 
        && 
        typeof this.props.data[this.props.waspmote_id][this.props.sensor_key] !== 'undefined') {
            let chartData = this.props.data[this.props.waspmote_id][this.props.sensor_key];
            chartData.forEach(element => {
                data.push(element.value);
                labels.push(element.created_at);
                data2.push(element.time_get_sample);
                labels2.push(element.value);
            });
        }
        return (
            <React.Fragment>
                <div className="double-chart-wrapper">
                    <div className="double-chart-child-wrapper">
                        <div className="double-chart-child-header">Value Chart</div>
                        <LineChart 
                        label={label} 
                        labels={labels} 
                        options={options}
                        lineOptions={lineOptions}
                        data={this.props.reverse ? data.reverse() : data}></LineChart>
                    </div>
                    <div className="double-chart-child-wrapper">
                        <div className="double-chart-child-header">Time Get Sample Chart</div>
                        <LineChart 
                        label={label} 
                        labels={labels2}
                        options={options}
                        lineOptions={lineOptions}
                        data={this.props.reverse ? data2.reverse() : data2}></LineChart>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const mapStatetoProps = state => {
    return state.ChartData;
};
  
export default withRouter(connect(mapStatetoProps, { getChartData })(DoubleChart));