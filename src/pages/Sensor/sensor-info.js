import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import FormLoader from "../../components/FormLoader"
import UpdateSensorForm from '../../components/Form/UpdateSensorForm';

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// actions
import { 
  getSensorInfo, 
  updateSensorInfo, 
  updateStateSensorInfo
 } from "../../store/actions";

class SensorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getSensorInfo(this.props.history, this.props.match.params.id);
  }

  handleSubmit = (values) => {
    const data = {
      name: values.name,
      key: values.key,
      unit: values.unit,
      description: values.description,
      chart_options: values['chart_options'] && JSON.parse(values['chart_options'])
    }
    this.props.updateSensorInfo(this.props.history, this.props.match.params.id, data);
  }

  render() {
    const { name, key, unit, description, chart_options } = this.props.data;

    const initialValues = {
      name,
      key,
      unit,
      description,
      chart_options: chart_options && JSON.stringify(chart_options, null, "\t"),
    };

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Sensor Info</h4>
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
                    this.props.loading.GET_SENSOR_INFO === false ? 
                    <UpdateSensorForm 
                        onSubmit={this.handleSubmit}
                        initialValues={initialValues}
                        loading={this.props.loading.UPDATE_SENSOR_INFO}/>
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
  return state.SensorInfo;
};

export default withRouter(connect(mapStatetoProps, { getSensorInfo, updateSensorInfo, updateStateSensorInfo })(SensorInfo));
