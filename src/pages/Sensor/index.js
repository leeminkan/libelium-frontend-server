import React, { Component } from "react";
import { Row, Col } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getSensor } from "../../store/actions";

import "../../assets/scss/custom.scss";

import SensorTable from './sensor-table';

class Sensor extends Component {

  componentDidMount() {
    let { current_page, per_page } = this.props.meta;
    this.props.getSensor(this.props.history, { page: current_page, per_page }, this.props.sort, this.props.filter);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Sensor</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <SensorTable/>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state.Sensor;
};

export default withRouter(connect(mapStatetoProps, { getSensor })(Sensor));
