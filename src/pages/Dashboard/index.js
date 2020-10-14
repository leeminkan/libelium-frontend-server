import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDevices } from "../../store/actions";

import "chartist/dist/scss/chartist.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDevices(this.props.history);
  }

  renderDevices = () => {
    const { devicesData } = this.props;
    const view = [];
    if (devicesData) {
      if (Array.isArray(devicesData)) {
        // the array is defined and has at least one element
        devicesData.forEach(device => {
          view.push(
              <Col key={device.id} xl={3} md={6}>
                <Card className="waspmote bg-primary text-white">
                  <CardBody>
                    <div className="waspmote-img">
                      <img src={waspmote} alt="" />
                    </div>
                    <div className="pt-2">
                      <span>{device.waspmote_id + ' - ' + device.name}</span>
                      <div className="float-right">
                          <i className="mdi mdi mdi-battery-90 h5"></i>
                          <span>{device.battery + '%'}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              );
        });
      }
    }
    return view;

  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Dashboard</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          
          <Row>{this.renderDevices()}</Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { errors, loading, devicesData } = state.Dashboard;
  return { errors, loading, devicesData };
};

export default withRouter(connect(mapStatetoProps, { getDevices })(Dashboard));
