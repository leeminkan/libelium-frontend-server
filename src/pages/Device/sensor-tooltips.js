import React, { Component } from "react";
import { Tooltip } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "../../assets/scss/custom.scss";

class SensorTooltips extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ttleft: false,
      };
    }
    render() {
        const { device, sensor } = this.props;
        const tooltipId = `Tooltip-${device.waspmote_id}-${sensor.key}`
        return (
            <React.Fragment>
                <Tooltip 
                placement="left" 
                isOpen={this.state.ttleft} 
                target={tooltipId} 
                toggle={()=> this.setState({ ttleft: !this.state.ttleft  })}>
                    { this.props.children }
                </Tooltip>
                <span 
                    id={tooltipId}
                    className="sensor-item badge badge-info">
                    {sensor.key}
                </span>
            </React.Fragment>
    );
    }
}

const mapStatetoProps = state => {
  return state.Device;
};

export default withRouter(connect(mapStatetoProps, { })(SensorTooltips));
