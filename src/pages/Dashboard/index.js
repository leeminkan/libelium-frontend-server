import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDevices } from "../../store/actions";

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

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
                <div key={device.id} className="waspmote-item-wrapper">
                  <div className="waspmote-item-wrapper-child">
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
                  </div>
                </div>
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
          <Carousel responsive={responsive}>
            {this.renderDevices()}
          </Carousel>
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
