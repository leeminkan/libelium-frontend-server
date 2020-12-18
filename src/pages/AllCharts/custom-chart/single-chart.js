import React, { Component } from 'react';
import LineChart from './linechart';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getChartData } from "../../../store/actions";

class SingleChart extends Component {

    componentDidMount() {
      this.props.getChartData(this.props.history, this.props.waspmote_id, this.props.sensor_key, this.props.limit, this.props.sort);
    }

    render() {
        let data = [];
        let label = this.props.label;
        let labels = [];
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
            });
        }
        return (
            <React.Fragment>
                <div className="single-chart-wrapper">
                    <div className="single-chart-child-wrapper">
                        <div className="single-chart-child-header">Value Chart</div>
                        <LineChart 
                        label={label} 
                        labels={labels} 
                        options={options}
                        lineOptions={lineOptions}
                        data={this.props.reverse ? data.reverse() : data}></LineChart>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const mapStatetoProps = state => {
    return state.ChartData;
};
  
export default withRouter(connect(mapStatetoProps, { getChartData })(SingleChart));