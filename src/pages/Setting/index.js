import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import FormLoader from "../../components/FormLoader"

import UpdateSettingForm from '../../components/Form/UpdateSettingForm';

import "chartist/dist/scss/chartist.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getSetting, updateSetting, getDevice, getSensor } from "../../store/actions";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.props.getSetting(this.props.history);
    this.props.getDevice(this.props.history, { }, { }, { });
    this.props.getSensor(this.props.history, { }, { }, { });
  }

  handleSubmit = (values) => {
    let data = {
      comparition_page: {
        waspmote_ids: values.waspmote_ids,
        sensors: values.sensors,
        waspmote_algorithm: values.waspmote_algorithm,
        mode: values.mode
      },
      algorithm_param_page: {
        waspmote_ids: values.algorithm_waspmote_ids,
      }
    }
    this.props.updateSetting(this.props.history, data);
  }

  render() {
    const { comparition_page, algorithm_param_page } = this.props.data
    const initialValues = {
      sensors: comparition_page ? comparition_page.sensors : [],
      sampleSensors: this.props.sensors,
      waspmote_ids: comparition_page ? comparition_page.waspmote_ids : [],
      sampleDevices: this.props.devices,
      waspmote_algorithm: comparition_page ? comparition_page.waspmote_algorithm : "",
      mode: comparition_page ? comparition_page.mode : "",
      algorithm_waspmote_ids: algorithm_param_page ? algorithm_param_page.waspmote_ids : [],
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Setting</h4>
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
                    this.props.loading.GET_SETTING === false &&
                    this.props.loading.GET_DEVICE === false &&
                    this.props.loading.GET_SENSOR === false  ? 
                    <UpdateSettingForm 
                        onSubmit={this.handleSubmit}
                        initialValues={initialValues}
                        loading={this.props.loading.UPDATE_SETTING}/>
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
    ...state.Setting, 
    devices: state.Device.data,
    sensors: state.Sensor.data,
    loading: {
      ...state.Setting.loading,
      ...state.Device.loading,
      ...state.Sensor.loading,
    }
  };
};

export default withRouter(connect(mapStatetoProps, { getSetting, updateSetting, getDevice, getSensor })(Setting));
