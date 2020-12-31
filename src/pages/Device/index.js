import React, { Component } from "react";
import { 
  Row, 
  Col, 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink,
} from "reactstrap";
import classnames from "classnames";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDevice, getAllSensorForDevicePage } from "../../store/actions";

import "../../assets/scss/custom.scss";
import DeviceTable from './device-table';
import DeviceView from './device-view';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
  }

  toggle = tab => {
    if(this.state.activeTab !== tab) 
    this.setState({ activeTab: tab });
  }

  componentDidMount() {
    let { current_page, per_page } = this.props.meta;
    this.props.getDevice(this.props.history, { page: current_page, per_page }, this.props.sort, this.props.filter);
    this.props.getAllSensorForDevicePage(this.props.history);
  }

  render() {
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Device</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Table View
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                Custom View
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <DeviceTable/>
              </TabPane>
              <TabPane tabId="2">
                <DeviceView/>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state.Device;
};

export default withRouter(connect(mapStatetoProps, { getDevice, getAllSensorForDevicePage })(Device));
