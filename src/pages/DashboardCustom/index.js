import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

import "chartist/dist/scss/chartist.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const waspmoteId = "#1";
    const battery = "90%";
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

          <Row>
            <Col xl={3} md={6}>
              <Card className="waspmote bg-primary text-white">
                <CardBody>
                  <div className="waspmote-img">
                    <img src={waspmote} alt="" />
                  </div>
                  <div className="pt-2">
                    <span>{waspmoteId}</span>
                    <div className="float-right">
                        <i className="mdi mdi mdi-battery-90 h5"></i>
                        <span>{battery}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
