import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import Loader from "../../components/Loader";
// actions
import { loginUser } from "../../store/actions";

// import images
import logoSm from "../../assets/images/logo-sm.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.loginUser(values, this.props.history);
  }

  showError = (errors) => {
    const view = [];
    if (errors) {
      if (Array.isArray(errors)) {
        // the array is defined and has at least one element
        errors.forEach(error => {
          view.push(<Alert color="danger">{error.message}</Alert>);
        });
      } else {
        view.push(<Alert color="danger">{errors.message}</Alert>);
      }
    }
    return view;
  }

  render() {
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-5">
          <div className="container">
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <div className="position-relative">
                  {this.props.loading ? <Loader /> : null}

                  <Card className="overflow-hidden">
                    <div className="bg-primary">
                      <div className="text-primary text-center p-4">
                        <h5 className="text-white font-size-20">
                          Welcome Back !
                        </h5>
                        <p className="text-white-50">
                          Sign in to continue to Libelium Project.
                        </p>
                        <Link to="/" className="logo logo-admin">
                          <img src={logoSm} height="24" alt="logo" />
                        </Link>
                      </div>
                    </div>

                    <CardBody className="p-4">
                      <div className="p-3">
                        <AvForm
                          className="form-horizontal mt-4"
                          onValidSubmit={this.handleValidSubmit}
                        >
                          {this.showError(this.props.errors)}

                          <div className="form-group">
                            <AvField
                              name="email"
                              label="Email"
                              className="form-control"
                              value="admin@gmail.com"
                              placeholder="Enter email"
                              type="email"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                              name="password"
                              label="Password"
                              type="password"
                              required
                              value="Bss123"
                              placeholder="Enter Password"
                            />
                          </div>

                          <Row className="form-group">
                            <Col sm={6}>
                              &nbsp;
                              {/* <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                            <label className="custom-control-label" for="customControlInline">Remember me</label>
                                                        </div> */}
                            </Col>
                            <Col sm={6} className="text-right">
                              <button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </button>
                            </Col>
                          </Row>
                        </AvForm>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, errors, loading } = state.Login;
  return { error, errors, loading };
};

export default withRouter(connect(mapStatetoProps, { loginUser })(Login));
