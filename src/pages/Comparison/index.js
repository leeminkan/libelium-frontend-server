import React, { Component } from "react";
import { Row, Col} from "reactstrap";
import 'react-multi-carousel/lib/styles.css';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
import ChartView from "./chart-view";

import { getComparisionPageSetting, updateStateComparisionPage, getDevice, getSensor } from "../../store/actions";

class Comparison extends Component {

  componentDidMount() {
    this.props.getComparisionPageSetting();
    this.props.getDevice(this.props.history, { }, { }, { });
    this.props.getSensor(this.props.history, { }, { }, { });
  }

  componentWillUnmount() {
    this.props.updateStateComparisionPage({
      loading: {}
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Comparision</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <ChartView></ChartView>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state.Comparision;
};

export default withRouter(connect(mapStatetoProps, { getComparisionPageSetting, updateStateComparisionPage, getDevice, getSensor })(Comparison));
