import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as util from '../../helpers/util';

// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDisplayedDevices, resetDashboard } from "../../store/actions";

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
import ChartView from "./chart-view";
import Loader from '../../components/ThreeDotsLoader'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 2048 },
    items: 4
  },
  custom: {
    breakpoint: { max: 2048, min: 1024 },
    items: 3
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
    this.props.getDisplayedDevices(this.props.history);
  }
  
  componentWillUnmount() {
    this.props.resetDashboard();
  }

  renderDevices = () => {
    const { devicesData } = this.props;
    const view = [];
    if (devicesData) {
      if (Array.isArray(devicesData)) {
        // the array is defined and has at least one element
        devicesData.forEach(device => {
          view.push(
            <Card key={device.id} className="waspmote bg-primary text-white">
              <CardBody>
                <div className="waspmote-img">
                  <img src={device.image ? util.parseUrlImage(device.image) : waspmote} alt="" />
                </div>
                <div className="waspmote-content">
                  <div className="waspmote-content-left waspmote-content-column">
                    <div className="waspmote-content-left-row">
                      <i className="mdi mdi-information h5"></i>
                      <span>{device.name}</span>
                    </div>
                    <div className="waspmote-content-left-row">
                      <i className="mdi mdi-music-accidental-sharp h5"></i>
                      <span>{device.waspmote_id}</span>
                    </div>
                    <div className="waspmote-content-left-row">
                      <i className={`fas fa-circle ${device.active ? "icon-active" : "icon-deactive"}`}></i>
                      <span>{device.active ? "Active" : "Deactive"}</span>
                    </div>
                  </div>
                  <div className="waspmote-content-right waspmote-content-column">
                    <div className="waspmote-content-right-row">
                      <span>{device.battery + '%'}</span>
                      <i className="mdi mdi mdi-battery-90 h5"></i>
                    </div>
                    <div className="waspmote-content-right-row">
                      <span>{device.count_sensors}</span>
                      <i className="fas fa-microchip h5"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
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
          {
            this.props.loading.GET_DISPLAYED_DEVICES === false ? 
            (
              <React.Fragment>
                <Carousel responsive={responsive}>
                  {this.renderDevices()}
                </Carousel>
                <ChartView></ChartView>
              </React.Fragment>
            ) :
            <div className="wrapper-item-center">
                <Loader/>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state.Dashboard;
};

export default withRouter(connect(mapStatetoProps, { getDisplayedDevices, resetDashboard })(Dashboard));
