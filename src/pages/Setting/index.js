import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import "chartist/dist/scss/chartist.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getSetting } from "../../store/actions";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getSetting(this.props.history);
  }

  render() {
    const {saving_level, window_size, time_base} = this.props.data;

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
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <AvForm>
                    <AvField
                      name="window_size"
                      label="Window Size  "
                      placeholder="Enter Window Size "
                      value={window_size}
                      type="number"
                      errorMessage="Please Enter Window Size"
                      validate={{
                        required: { value: true },
                        pattern: {
                          value: "^[0-9]+$",
                          errorMessage: "Window Size is invalid"
                        }
                      }}
                    />
                    
                    <AvField
                      name="saving_level"
                      label="Saving Level  "
                      placeholder="Enter Saving Level "
                      value={saving_level}
                      type="number"
                      errorMessage="Please Enter Saving Level"
                      validate={{
                        required: { value: true },
                        pattern: {
                          value: "^[0-9]+$",
                          errorMessage: "Saving Level is invalid"
                        }
                      }}
                    />
                    
                    <AvField
                      name="time_base"
                      label="Time base  "
                      placeholder="Enter Time base "
                      value={time_base}
                      type="number"
                      errorMessage="Please Enter Time base"
                      validate={{
                        required: { value: true },
                        pattern: {
                          value: "^[0-9]+$",
                          errorMessage: "Time base is invalid"
                        }
                      }}
                    />
                    <FormGroup className="mb-0">
                      <div>
                        <Button type="submit" color="primary" className="mr-1">
                          Save
                        </Button>
                      </div>
                    </FormGroup>
                  </AvForm>
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
  const { errors, loading, data } = state.Setting;
  return { errors, loading, data };
};

export default withRouter(connect(mapStatetoProps, { getSetting })(Setting));
