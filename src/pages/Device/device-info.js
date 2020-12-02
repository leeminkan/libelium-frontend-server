import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Spinner } from "reactstrap";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import FormLoader from "../../components/FormLoader"
import ImageUploader from 'react-images-upload';
import Select from 'react-select';
import * as util from '../../helpers/util';

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { 
  getDeviceInfo, 
  updateDeviceInfo, 
  updateStateDeviceInfo,
  getAllSensor
 } from "../../store/actions";
// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDeviceInfo(this.props.history, this.props.match.params.id);
    this.props.getAllSensor(this.props.history);
  }

  handleSubmit = (event, errors, values) => {
    const { file, selectedSensors } = this.props;
    if (errors.length === 0) {
      if (file) {
        values.image = file;
      }
      values.sensors = JSON.stringify(selectedSensors);
      this.props.updateDeviceInfo(this.props.history, this.props.match.params.id, values);
    }
  }

  onDrop = (file) => {
    if (file.length === 1) {
      this.props.updateStateDeviceInfo({
        file: file[0]
      });
    }
  }
  
  handleChange = selectedOption => {
    let selectedSensors = [];
    if (Array.isArray(selectedOption) && selectedOption.length > 0) {
      selectedSensors = selectedOption.map(({ value }) => value);
    }
    this.props.updateStateDeviceInfo({
      selectedSensors
    });
  };

  renderChooseSensorsView = () => {
    let options = [];
    let defaultValue = [];

    if (Array.isArray(this.props.sensors) && this.props.sensors.length > 0) {
      options = this.props.sensors.map(obj => {
        return {
          value: obj.id,
          label: obj.name
        };
      })
    }

    if (Array.isArray(this.props.data.sensors) && this.props.data.sensors.length > 0) {
      defaultValue = this.props.data.sensors.map(obj => {
        return {
          value: obj.id,
          label: obj.name
        };
      })
    }

    return (
        <Select
          defaultValue={defaultValue}
          options={options}
          onChange={this.handleChange}
          isMulti
          name="sensors"
          className="basic-multi-select"
          classNamePrefix="select"
        />
    );
  }

  render() {
    const { name, image, waspmote_id, is_displayed } = this.props.data;
    
    const defaultValues = {
      name,
      waspmote_id,
      is_displayed,
    };

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">DeviceInfo</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {
                    this.props.loading.GET_DEVICE_INFO ? 
                  <FormLoader/> :
                  <AvForm onSubmit={this.handleSubmit}  model={defaultValues}>
                    <AvField
                      name="name"
                      label="Name  "
                      placeholder="Enter Name "
                      type="text"
                      errorMessage="Please Enter Name"
                      validate={{
                        required: { value: true },
                        pattern: {value: '^[A-Za-z0-9 ]+$'},
                        minLength: {value: 2},
                        maxLength: {value: 16}
                      }}
                    />
                    <AvField
                      name="waspmote_id"
                      label="Waspmote ID  "
                      placeholder="Enter Waspmote ID "
                      type="text"
                      errorMessage="Please Enter Waspmote ID"
                      validate={{
                        required: { value: true },
                        pattern: {value: '^[A-Za-z0-9]+$'},
                        minLength: {value: 1},
                        maxLength: {value: 16}
                      }}
                    />
                    <AvRadioGroup className="display-radio" inline name="is_displayed" label="Display" required>
                      <AvRadio label="Yes" value={1} />
                      <AvRadio label="No" value={0} />
                    </AvRadioGroup>
                    <FormGroup>
                      <label htmlFor="image"> Image </label>
                      <Row>
                        <Col className="image-field-col">
                          <div className="image-wrapper">
                            <img
                              id="image-preview"
                              className=""
                              src={image ? util.parseUrlImage(image) : waspmote}
                              alt="device"
                            />
                          </div>
                        </Col>
                        <Col className="image-field-col">
                          <ImageUploader
                              withIcon={true}
                              buttonText='Choose images'
                              onChange={this.onDrop}
                              imgExtension={['.jpg', '.gif', '.png', '.gif']}
                              maxFileSize={2097152}
                              singleImage={true}
                              withPreview={true}
                              withLabel={true}
                              label="Max file size: 2mb, accepted: jpg|jpeg|png"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="sensors"> Sensors </label>
                      <Row>
                        <Col>
                          {this.renderChooseSensorsView()}
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <div>
                        {
                          this.props.loading.UPDATE_DEVICE_INFO ? 
                          <Button type="submit" className="mr-1">
                            <Spinner size="sm" color="primary" />
                          </Button> :
                          <Button type="submit" color="primary" className="mr-1">
                            Save
                          </Button>
                        }
                      </div>
                    </FormGroup>
                  </AvForm>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}


const mapStatetoProps = state => {
  return state.DeviceInfo;
};

export default withRouter(connect(mapStatetoProps, { getDeviceInfo, updateDeviceInfo, updateStateDeviceInfo, getAllSensor })(DeviceInfo));
