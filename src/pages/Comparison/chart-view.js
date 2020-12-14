import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import CustomChart from '../AllCharts/custom-chart';

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
        const { sensors, waspmote_ids } = this.props.setting;
        let chartView = [];

        const renderSensorChart = (sensor_key) => {
            let sensorChartView = [];
            waspmote_ids.forEach(waspmote_id => {
                sensorChartView.push(
                    <Col key={waspmote_id + sensor_key} lg={6}>
                        <Card>
                            <CardBody>
                                <CustomChart waspmote_id={waspmote_id} sensor_key={sensor_key} sort={'asc'}></CustomChart>
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
                                {sensor_key}
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

        return (
            <React.Fragment>
                {this.renderCharts()}
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return state.Comparision;
};
  
export default withRouter(connect(mapStatetoProps, { })(CompareChartView));

