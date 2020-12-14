import React, { Component } from 'react';
import LineChart from './linechart';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getChartData } from "../../../store/actions";

class CustomChart extends Component {

    componentDidMount() {
      this.props.getChartData(this.props.history, this.props.waspmote_id, this.props.sensor_key, this.props.limit, this.props.sort);
    }

    render() {
        let data = [];
        let label = this.props.sensor_key;
        let labels = [];
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
                <LineChart label={label} labels={labels} data={this.props.reverse ? data.reverse() : data}></LineChart>
            </React.Fragment>
        );
    }
}


const mapStatetoProps = state => {
    return state.ChartData;
};
  
export default withRouter(connect(mapStatetoProps, { getChartData })(CustomChart));