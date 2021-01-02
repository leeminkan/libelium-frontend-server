import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SingleChart from '../AllCharts/custom-chart/single-chart';
import SingleRealtimeChart from '../AllCharts/custom-chart/single-realtime-chart';
import DoubleChart from '../AllCharts/custom-chart/double-chart';
import DoubleRealtimeChart from '../AllCharts/custom-chart/double-realtime-chart';

import Loader from '../../components/ThreeDotsLoader'

// import * as util from '../../helpers/util';

class CompareChartView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: []
        };
    }

    customSetState = (state) => {
        this.setState({
            ...this.state,
            ...state
        })
    }

    collapse = (value) => {
        if (!this.state.collapse.includes(value)) {
            this.state.collapse.push(value);
        } else {
            let index = this.state.collapse.indexOf(value);
            this.state.collapse.splice(index, 1);
        }
        this.customSetState({
            collapse: this.state.collapse
        });
    }

    renderCharts = () => {
        const { sensors, waspmote_ids, waspmote_algorithm, mode } = this.props.setting;
        let chartView = [];

        const renderSensorChart = (sensor) => {
            let sensorChartView = [];
            waspmote_ids.forEach(waspmote_id => {
                let algorithm_parameter = this.props.algorithm_parameters.find(item => {
                    return item.waspmote_id === waspmote_id;
                })
                let device = this.props.devices.find(item => {
                    return item.waspmote_id === waspmote_id;
                })
                sensorChartView.push(
                    <Col key={waspmote_id + sensor.key} lg={6}>
                        <Card>
                            <CardHeader>
                                {device.name}
                            </CardHeader>
                            <CardBody>
                                {
                                    mode.value === 'apex-realtime' ? (
                                        waspmote_id === waspmote_algorithm && sensor.key !== "battery" ?
                                        <DoubleRealtimeChart 
                                        waspmote_id={waspmote_id} 
                                        sensor_key={sensor.key}
                                        sensor={sensor}
                                        algorithm_parameter_id={algorithm_parameter ? algorithm_parameter.id : null}
                                        sort={'asc'}></DoubleRealtimeChart>
                                        :
                                        <SingleRealtimeChart 
                                        waspmote_id={waspmote_id} 
                                        sensor_key={sensor.key}
                                        sensor={sensor}
                                        algorithm_parameter_id={algorithm_parameter ? algorithm_parameter.id : null}
                                        sort={'asc'}></SingleRealtimeChart>
                                    ) : (
                                        waspmote_id === waspmote_algorithm && sensor.key !== "battery" ?
                                        <DoubleChart 
                                        waspmote_id={waspmote_id} 
                                        sensor_key={sensor.key}
                                        algorithm_parameter_id={algorithm_parameter ? algorithm_parameter.id : null}
                                        sort={'asc'}></DoubleChart>
                                        :
                                        <SingleChart 
                                        waspmote_id={waspmote_id} 
                                        sensor_key={sensor.key}
                                        sensor={sensor}
                                        algorithm_parameter_id={algorithm_parameter ? algorithm_parameter.id : null}
                                        sort={'asc'}></SingleChart>
                                    )
                                }
                            </CardBody>
                        </Card>
                    </Col>
                )
            });
            return sensorChartView;
        }

        sensors.forEach((sensor_key) => {
            let sensor = this.props.sensors.find(item => item['key'] === sensor_key);
            let error_rate = this.props.error_rates.find(item => item.sensor_key === sensor_key);
            chartView.push(
                    <Card key={sensor_key}>
                        <CardHeader>
                            <div onClick={() => {
                                this.collapse(sensor_key)
                            }}>
                                <div className="compararision-page-card-header">
                                    <div className="sensor-name">
                                        {sensor.name}
                                    </div>
                                    <div className="error-rate">
                                        {
                                            error_rate
                                            && 
                                            <span className="badge badge-info">
                                                {`Error rate: ${error_rate.value}%`}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Collapse isOpen={!this.state.collapse.includes(sensor_key)}>
                                <Row>
                                    {renderSensorChart(sensor)}
                                </Row>
                            </Collapse>
                        </CardBody>
                    </Card>
            );
        });
        return chartView;
    }


    render() {
        return (
            <React.Fragment>
                {
                    this.props.loading.GET_DEVICE === false &&
                    this.props.loading.GET_SENSOR === false &&
                    this.props.loading.GET_ALL_ALGORITHM_PARAMETER === false &&
                    this.props.loading.GET_COMPARISION_PAGE_SETTING === false ? 
                    this.renderCharts() :
                    <div className="wrapper-item-center">
                        <Loader/>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ...state.Comparision, 
        sensors: state.Sensor.data,
        devices: state.Device.data,
        algorithm_parameters: state.AlgorithmParameter.data,
        loading: {
            ...state.Comparision.loading,
            ...state.Sensor.loading,
            ...state.Device.loading,
            ...state.AlgorithmParameter.loading,
        }
    };
};
  
export default withRouter(connect(mapStatetoProps, { })(CompareChartView));

