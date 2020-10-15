import React, { Component } from "react";
import { Row, Col, Card, CardBody  } from "reactstrap";
import { Scatter } from 'react-chartjs-2';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getTemperature } from "../../store/actions";

import "../../assets/scss/custom.scss";

class TemperatureChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTemperature(this.props.history);
  }
  
  renderChart = () => {
    const { data } = this.props;
    let dataPoint = [];

    for(var i = 0; i < data.length; i++) {
      var obj = data[i];
      dataPoint.push({
        x: i + 1,
        y: obj.value
      });
    }

    // for (let i = 1; i < 1000; i++) {
    //   dataPoint.push({
    //     x: i,
    //     y: (Math.random() * (40 - 0) + 0).toFixed(2)
    //   });
    // }

    const dataChart = {
      datasets: [{
          label: 'Temperature',
          fill: false,
          showLine: true,
          pointBorderColor: '#000000',
          pointBackgroundColor: '#ffffff',
          pointBorderWidth: 0.1,
          pointHoverRadius: 0,
          pointRadius: 0.5,
          pointHitRadius: 10,
          data: dataPoint
      }]
    };
    
    var optionChart = {
      scales: {
        yAxes: [{
          display: true,
          labelString: "Temperature (°C)",
          // ticks: {
          //     max: 50,
          //     min: -10
          // }
        }]
      }
    }

    return (
      <Col lg="9 m-auto">
        <Card>
          <CardBody>
              <Scatter data={dataChart} options={optionChart} />
          </CardBody>
        </Card>
      </Col>
    );

  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Temperature Chart</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          
          <Row>{this.renderChart()}</Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { errors, loading, data } = state.Chart;
  return { errors, loading, data };
};

export default withRouter(connect(mapStatetoProps, { getTemperature })(TemperatureChart));
