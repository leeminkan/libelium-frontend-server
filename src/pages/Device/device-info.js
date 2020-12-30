import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import FormLoader from "../../components/FormLoader"
import UpdateDeviceForm from '../../components/Form/UpdateDeviceForm';

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { 
  getDeviceInfo, 
  updateDeviceInfo, 
  getSensor
 } from "../../store/actions";

class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDeviceInfo(this.props.history, this.props.match.params.id);
    this.props.getSensor(this.props.histor, {}, {}, {});
  }

  handleSubmit = (values) => {
    const data = {
      name: values.name,
      waspmote_id: values.waspmote_id,
      is_displayed: values.is_displayed ? 1 : 0,
      sensors: JSON.stringify(values.sensors),
      description: values.description,
      algorithm_param_description: values.algorithm_param_description,
    }
    if (values.image) {
      data.image = values.image;
    }
    this.props.updateDeviceInfo(this.props.history, this.props.match.params.id, data);
  }

  render() {
    const { 
      name, 
      image, 
      waspmote_id, 
      is_displayed, 
      sensors, 
      description,
      algorithm_param_description
    } = this.props.data;

    let sensorIds = sensors ? sensors.map(item => item.id) : [];

    const initialValues = {
      name,
      waspmote_id,
      is_displayed,
      sensors: sensorIds,
      image_default: image,
      sampleSensors: this.props.sensors,
      description,
      algorithm_param_description,
    };
    
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">DeviceInfo</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row className="wrapper-item-center">
              <Card>
                <CardBody className="wrapper-item-center">
                  {
                    this.props.loading.GET_SENSOR === false &&
                    this.props.loading.GET_DEVICE_INFO === false ? 
                    <UpdateDeviceForm 
                        onSubmit={this.handleSubmit}
                        initialValues={initialValues}
                        loading={this.props.loading.UPDATE_DEVICE_INFO}/>
                    :
                    <FormLoader/>
                  }
                </CardBody>
              </Card>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}


const mapStatetoProps = state => {
  return { 
    ...state.DeviceInfo, 
    sensors: state.Sensor.data,
    loading: {
      ...state.DeviceInfo.loading,
      ...state.Sensor.loading,
    }
  };
};

export default withRouter(connect(mapStatetoProps, { getDeviceInfo, updateDeviceInfo, getSensor })(DeviceInfo));
