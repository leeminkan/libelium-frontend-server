import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Spinner } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import FormLoader from "../../components/FormLoader"

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getSensorInfo, updateSensorInfo, updateStateSensorInfo } from "../../store/actions";

class SensorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getSensorInfo(this.props.history, this.props.match.params.id);
  }

  handleSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      this.props.updateSensorInfo(this.props.history, this.props.match.params.id, values);
    }
  }

  render() {
    const { name } = this.props.data;

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
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {
                    this.props.loading.GET_SENSOR_INFO ? 
                  <FormLoader/> :
                  <AvForm onSubmit={this.handleSubmit}>
                    <AvField
                      name="name"
                      label="Name  "
                      placeholder="Enter Name "
                      value={name}
                      type="text"
                      errorMessage="Please Enter Name"
                      validate={{
                        required: { value: true },
                        pattern: {value: '^[A-Za-z0-9 ]+$'},
                        minLength: {value: 2},
                        maxLength: {value: 16}
                      }}
                    />
                    <FormGroup className="mb-0">
                      <div>
                        {
                          this.props.loading.UPDATE_SENSOR_INFO ? 
                          <Button type="submit" className="mr-1">
                            <Spinner size="sm" color="primary" />
                          </Button> :
                          <Button type="submit" color="primary" className="mr-1">
                            Save
                          </Button>
                        }
                      </div>
                    </FormGroup>
                  </AvForm>
                  }
                </CardBody>
              </Card>
            </Col>
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
