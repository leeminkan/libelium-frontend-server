import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "../../assets/scss/custom.scss";
import * as util from '../../helpers/util';
// import images
import waspmote from "../../assets/images/libelium/waspmote.png";
import SensorTooltips from "./sensor-tooltips";
import SensorTooltipContent from "./sensor-tooltip-content";

class DeviceView extends Component {
    renderSensorView = (device) => {
        let view = [];
        device.sensors.forEach((item, index) => {
            view.push(
                <div
                    key={'sensor_' + item.key} >
                    <SensorTooltips
                        device={device}
                        sensor={item}
                    >
                        <SensorTooltipContent sensor={item}/>
                    </SensorTooltips>
                </div>
            );
        });
        return view;
    }
    renderDeviceView = () => {
        const { data } = this.props;
        let view = [];
        data.forEach((item, index) => {
            view.push(
              <Col 
              sm={6} 
              key={item.waspmote_id}
              className="col-device-view" >
                  <Card
                    className="device-view">
                      <CardBody>
                        <div className="device-container">
                            <div className="device-row">
                                <div className="device-image">
                                    <div className="image-wrapper">
                                        <img
                                            src={item.image ? util.parseUrlImage(item.image) : waspmote}
                                            alt="device"
                                        />
                                    </div>
                                </div>
                                <div className="device-info">
                                    <div className="device-info-row">
                                            <Alert color="primary">
                                                <strong>Name: </strong>
                                                {item.name}
                                            </Alert>
                                    </div>
                                    <div className="device-info-row">
                                            <Alert color="success">
                                                <strong>Waspmote ID: </strong>
                                                {item.waspmote_id}
                                            </Alert>
                                    </div>
                                    <div className="device-info-row">
                                            <Alert color="info">
                                                <strong>Description: </strong>
                                                {item.description}
                                            </Alert>
                                    </div>
                                    <div className="device-info-row">
                                            <Alert color="info">
                                                <strong>Algorithm Param Description: </strong>
                                                {item.algorithm_param_description}
                                            </Alert>
                                    </div>
                                    <div className="device-info-row">
                                            <Alert color="secondary">
                                                <strong>Sensors: </strong>
                                                <div className="device-info-sensors">
                                                    {this.renderSensorView(item)}
                                                </div>
                                            </Alert>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                      </CardBody>
                  </Card>
              </Col>
            )
        });
        return view;
    }

    render() {
    return (
        <React.Fragment>
            <Row>
                {this.renderDeviceView()}
            </Row>
        </React.Fragment>
    );
    }
}

const mapStatetoProps = state => {
  return state.Device;
};

export default withRouter(connect(mapStatetoProps, { })(DeviceView));
