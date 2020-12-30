
import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import RealtimeChart from '../AllCharts/custom-chart/realtime-chart';


class ChartView extends Component {

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
        let chartView = [];

        const renderSensorChart = (item) => {
            let sensorChartView = [];
            item.sensors.forEach(sensor => {
                sensorChartView.push(
                    <Col key={item.waspmote_id + sensor.key} lg={6}>
                        <Card>
                            <CardBody>
                                <RealtimeChart waspmote_id={item.waspmote_id} sensor_key={sensor.key} sensor={sensor} limit={10} reverse={true}></RealtimeChart>
                            </CardBody>
                        </Card>
                    </Col>
                )
            });
            return sensorChartView;
        }

        this.props.devicesData.forEach((item) => {
            chartView.push(
                    <Card key={item.waspmote_id}>
                        <CardHeader>
                            <div onClick={() => {
                                this.collapse(item.waspmote_id)
                            }}>
                                {item.name}
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Collapse isOpen={!this.state.collapse.includes(item.waspmote_id)}>
                                <Row>
                                    {renderSensorChart(item)}
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
    return state.Dashboard;
};
  
export default withRouter(connect(mapStatetoProps, { })(ChartView));

