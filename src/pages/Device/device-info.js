import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Spinner } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import FormLoader from "../../components/FormLoader"
import ImageUploader from 'react-images-upload';
import * as util from '../../helpers/util';

import "chartist/dist/scss/chartist.scss";
import "../../assets/scss/custom.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDeviceInfo, updateDeviceInfo, updateStateDeviceInfo } from "../../store/actions";
// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDeviceInfo(this.props.history, this.props.match.params.id);
  }

  handleSubmit = (event, errors, values) => {
    const { file } = this.props;
    if (errors.length === 0) {
      if (file) {
        values.image = file;
      }
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

  render() {
    const { name, image, waspmote_id } = this.props.data;

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
                  <AvForm onSubmit={this.handleSubmit}>
                    <AvField
                      name="name"
                      label="Name  "
                      placeholder="Enter Name "
                      value={name}
                      type="text"
                      errorMessage="Please Enter Name"
                      validate={{
                        required: { value: true },
                        pattern: {value: '^[A-Za-z0-9]+$'},
                        minLength: {value: 2},
                        maxLength: {value: 16}
                      }}
                    />
                    <AvField
                      name="waspmote_id"
                      label="Waspmote ID  "
                      placeholder="Enter Waspmote ID "
                      value={waspmote_id}
                      type="text"
                      errorMessage="Please Enter Waspmote ID"
                      validate={{
                        required: { value: true },
                        pattern: {value: '^[A-Za-z0-9]+$'},
                        minLength: {value: 2},
                        maxLength: {value: 16}
                      }}
                    />
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

export default withRouter(connect(mapStatetoProps, { getDeviceInfo, updateDeviceInfo, updateStateDeviceInfo })(DeviceInfo));
