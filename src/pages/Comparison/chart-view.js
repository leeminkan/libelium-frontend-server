import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import SingleChart from '../AllCharts/custom-chart/single-chart';
import DoubleChart from '../AllCharts/custom-chart/double-chart';

import Loader from '../../components/ThreeDotsLoader'

import * as util from '../../helpers/util';

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
        const { sensors, waspmote_ids, waspmote_algorithm } = this.props.setting;
        let chartView = [];

        const renderSensorChart = (sensor_key) => {
            let sensorChartView = [];
            waspmote_ids.forEach(waspmote_id => {
                let algorithm_parameter = this.props.algorithm_parameters.find(item => {
                    return item.waspmote_id === waspmote_id;
                })
                sensorChartView.push(
                    <Col key={waspmote_id + sensor_key} lg={6}>
                        <Card>
                            <CardHeader>
                                {util.getAnotherValueFromArray(
                                    this.props.devices,
                                    'name',
                                    'waspmote_id',
                                    waspmote_id
                                )}
                            </CardHeader>
                            <CardBody>
                                {
                                    waspmote_id === waspmote_algorithm ?
                                    <DoubleChart 
                                    waspmote_id={waspmote_id} 
                                    sensor_key={sensor_key}
                                    algorithm_parameter_id={algorithm_parameter ? algorithm_parameter.id : null}
                                    sort={'asc'}></DoubleChart>
                                    :
                                    <SingleChart 
                                    waspmote_id={waspmote_id} 
                                    sensor_key={sensor_key}
                                    sort={'asc'}></SingleChart>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                )
            });
            return sensorChartView;
        }

        sensors.forEach((sensor_key) => {
            chartView.push(
                    <Card key={sensor_key}>
                        <CardHeader>
                            <div onClick={() => {
                                this.collapse(sensor_key)
                            }}>
                                {util.getAnotherValueFromArray(
                                    this.props.sensors,
                                    'name',
                                    'key',
                                    sensor_key
                                )}
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Collapse isOpen={!this.state.collapse.includes(sensor_key)}>
                                <Row>
                                    {renderSensorChart(sensor_key)}
                                </Row>
                            </Collapse>
                        </CardBody>
                    </Card>
            );
        });
        return chartView;
    }


    render() {
        console.log(this.props);
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

