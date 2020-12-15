import React, { Component } from "react";
import { Row, Col} from "reactstrap";
import 'react-multi-carousel/lib/styles.css';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
import { getAllAlgorithmParameter } from "../../store/actions";
import CardView from "./card-view"

class AlgorithmParameter extends Component {

  componentDidMount() {
    this.props.getAllAlgorithmParameter();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Algorithm Parameter</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <CardView></CardView>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state.AlgorithmParameter;
};

export default withRouter(connect(mapStatetoProps, { getAllAlgorithmParameter })(AlgorithmParameter));
