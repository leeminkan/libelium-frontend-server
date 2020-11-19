import React, { Component } from "react";
import { Row, Col, Table, Card, CardBody, 
  InputGroup, InputGroupAddon, InputGroupText, 
  Input, Form, Modal, FormGroup, Label, Button  } from "reactstrap";
import Select from 'react-select';
import TableLoader from "../../components/TableLoader"
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ImageUploader from 'react-images-upload';
// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDevice, updateStateDevice, getAllSensorForDevicePage, addDevice } from "../../store/actions";

import "../../assets/scss/custom.scss";

import PaginationBar from '../../components/PaginationBar/PaginationBar';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "ID",
          field: "id"
        },
        {
          label: "Waspmote ID",
          field: "waspmote_id"
        },
        {
          label: "Device Name",
          field: "name"
        },
        {
          label: "Time",
          field: "created_at"
        },
        {
          label: "Action",
          field: "action"
        },
      ]
    };
  }

  componentDidMount() {
    let { current_page, per_page } = this.props.meta;
    this.props.getDevice(this.props.history, { page: current_page, per_page }, this.props.sort, this.props.filter);
    this.props.getAllSensorForDevicePage(this.props.history);
  }

  //toggleAddFilterModal
  toggleAddFilterModal = () => {
    let { showAddFilterModal } = this.props;
    
    this.props.updateStateDevice({
      showAddFilterModal: !showAddFilterModal
    });
  }

  toggleAddDeviceModal = () => {
    let { showAddDeviceModal } = this.props;
    
    this.props.updateStateDevice({
      showAddDeviceModal: !showAddDeviceModal
    });
  }

  handleChangePage = (action, selectedPage) => {
    let { current_page, per_page } = this.props.meta;

    if (action === 'prev') {
      current_page -= 1;
    } else if (action === 'next') {
      current_page += 1;
    } else {
      current_page = selectedPage;
    }
    
    //call action change page
    this.props.getDevice(this.props.history, { page: current_page, per_page }, this.props.sort, this.props.filter);
  }

  handleChange = selectedOption => {
    let { meta } = this.props;
    //call action change page
    this.props.getDevice(this.props.history, {
      ...meta,
      per_page: selectedOption.value
    }, this.props.sort, this.props.filter);
  
  };

  handleOnclickSort = (e) => {
    let { meta, sort, filter } = this.props;
    let order = 'asc';
    if (e.target.id === sort.order_by) {
      if (sort.order === 'asc'){
        order = 'desc';
      }
    }
    this.props.getDevice(this.props.history, meta, {
      order_by: e.target.id,
      order
    }, filter);
  }

  handleFormFilterSubmit = (e) => {
    let { meta, sort, filter } = this.props;
    e.preventDefault();
    this.props.getDevice(this.props.history, meta, sort, filter);
  }

  handleChangeRadioAddFilter = (e) => {
    let { filter } = this.props;
    filter[e.target.value] = {
      column: String(e.target.id).replace('radio_id_', ''),
      value: ''
    }

    this.props.updateStateDevice({
      filter,
      showAddFilterModal: false
    });
  }

  handleChangeFilter = (e) => {
    let { filter, change } = this.props;
    const findIndex = String(e.target.id).replace('input_filter_', '');
    if (filter[findIndex]) {
      filter[findIndex] = {
          ...filter[findIndex],
          value: e.target.value
      }
    }
    change = change += 1;

    this.props.updateStateDevice({
      filter,
      change: change
    });
  }

  handleOnclickRemoveFilter = (e) => {
    let { filter, change } = this.props;
    const findIndex = String(e.target.id).replace('icon_filter_remove_', '');
    if (filter[findIndex]) {
      delete filter[findIndex];
    }
    change = change += 1;

    this.props.updateStateDevice({
      filter,
      change: change
    });
  }
  
  handleChangeSensor = selectedOption => {
    let selectedSensors = [];
    if (Array.isArray(selectedOption) && selectedOption.length > 0) {
      selectedSensors = selectedOption.map(({ value }) => value);
    }
    this.props.updateStateDevice({
      addPayload: {
        ...this.props.addPayload,
        selectedSensors
      }
    });
  };

  handleSubmitAddDeviceModal = (event, errors, values) => {
    const { file, selectedSensors } = this.props.addPayload;
    let { meta, sort, filter } = this.props;
    if (errors.length === 0) {
      if (file) {
        values.image = file;
      }
      if (selectedSensors) {
        values.sensors = JSON.stringify(selectedSensors);
      }
      this.props.addDevice(this.props.history, values, { meta, sort, filter });
    }
  }

  onDrop = (file) => {
    if (file.length === 1) {
      this.props.updateStateDevice({
        addPayload: {
          ...this.props.addPayload,
          file: file[0]
        }
      });
    }
  }

  renderDevice = () => {
    let { meta, sort, filter } = this.props;
    let { columns } = this.state;
    let paginationBarProps = {
      total: meta.total,
      currentPage: meta.current_page,
      sizePerPage: meta.per_page,
      handleChangePage: this.handleChangePage
    };

    const options = [
      { value: 5, label: 5 },
      { value: 10, label: 10 },
      { value: 20, label: 20 },
    ];

    let colgroupView = [];
    let theadView = [];
    columns.forEach((column, index) => {
      colgroupView.push(
        <col key={'col_' + column.field}/>
      );
      
      theadView.push(
        <th key={'th_'+column.field}>
          <label>{column.label}</label>
          {/* ion ion-ios-arrow-dropdown-circle, ion ion-ios-arrow-dropup-circle, ion ion-md-remove-circle-outline */}
          { column.field === 'action' ? null :
            sort.order_by === column.field 
            ?
              sort.order === 'asc'
              ?
              <i className="ion ion-ios-arrow-dropup-circle icon-sort" id={column.field} onClick={this.handleOnclickSort}></i>
              :
              <i className="ion ion-ios-arrow-dropdown-circle icon-sort" id={column.field} onClick={this.handleOnclickSort}></i>
            : 
              <i className="ion ion-md-remove-circle-outline icon-sort" id={column.field} onClick={this.handleOnclickSort}></i>
          }
          
        </th>
      );
    });
    let filterView = [];
    Object.keys(filter).forEach((key) => {
      filterView.push(
        <Form
        onSubmit={this.handleFormFilterSubmit}>
        <InputGroup key={key} className="data-collection-container-filter-main-group-input">
          <InputGroupAddon addonType="append">
            <InputGroupText>{filter[key].column}</InputGroupText>
          </InputGroupAddon>
          <Input 
          name={'input_filter_' + filter[key].column} 
          id={'input_filter_' + key}
          value={filter[key].value}
          onChange={this.handleChangeFilter}/>
          <i id={'icon_filter_remove_' + key} className="mdi mdi-tag-remove icon-remove-filter" onClick={this.handleOnclickRemoveFilter}></i>
        </InputGroup>
                  </Form>
      );
    });

    return (
      <Col xl={12}>
        <Card>
          <CardBody>
            <div className="data-collection-container">
              {
              this.props.loading.GET_DEVICE ? 
              <TableLoader/> :
              <React.Fragment>
                <div className="data-collection-top-bar">
                  <div className="data-collection-container-view">
                    <label>View</label>
                    <Select
                      value={{value: meta.per_page, label: meta.per_page}}
                      onChange={this.handleChange}
                      options={options}
                      className="data-collection-container-select"
                    />
                  </div>
                  <div className="data-collection-container-filter">
                    
                    <div className="data-collection-container-filter-main" >
                      <label>Filter</label>
                      <i className="mdi mdi-tag-plus icon-toggle-filter-modal"
                      onClick={this.toggleAddFilterModal}></i>
                    </div>
                    
                    <div className="data-collection-container-filter-main">
                      {
                        filterView
                      }
                    </div>
                  </div>
                  <div className="data-collection-container-action">
                    <Button 
                      onClick={this.toggleAddDeviceModal}>
                        ADD
                    </Button>
                  </div>
                </div>
                <Table responsive className="table-lg data-collection-table">
                <colgroup>
                {
                  colgroupView
                }
                </colgroup>
                <thead>
                  <tr>
                {
                  theadView
                }
                  </tr>
                </thead>
                <tbody>
                  {this.renderDeviceView()}
                </tbody>
                </Table>
                <PaginationBar {...paginationBarProps}/>
              </React.Fragment>
              }
            </div>
          </CardBody>
        </Card>
      </Col>
    );

  }
  
  renderDeviceView = () => {
    const { data } = this.props;
    const { columns } = this.state;
    let view = [];
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        const renderView = () => {
          let view = [];
          columns.forEach((column, index) => {
            if (column.field === 'action') {
              let to = `/device/${item.id}`;
              view.push(
                <td key={'td_action'}>
                  
                  <Link to={to} className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                </td>
              );
            } else {
              view.push(
                <td key={'td_'+column.field}>{item[`${column.field}`]}</td>
              );
            }
          });
          return view;
        }
        view.push(
          <tr key={item.id}>
            {
              renderView()
            }
          </tr>
        );
      });
    }
    return view;
  }

  renderChooseSensorsView = () => {
    let options = [];

    if (Array.isArray(this.props.sensors) && this.props.sensors.length > 0) {
      options = this.props.sensors.map(obj => {
        return {
          value: obj.id,
          label: obj.name
        };
      })
    }

    return (
        <Select
          options={options}
          onChange={this.handleChangeSensor}
          isMulti
          name="sensors"
          className="basic-multi-select"
          classNamePrefix="select"
        />
    );
  }

  render() {
    const { showAddFilterModal, filter, showAddDeviceModal } = this.props;
    const { columns } = this.state;
    let radioFilterView = [];
    columns.forEach((column, index) => {
      if (column.field === 'action') return;
      if (!filter[column.field])
      {
        radioFilterView.push(
          <FormGroup key={'formgroup_'+column.field} check>
            <Label check>
              <Input 
              onChange={this.handleChangeRadioAddFilter}
              type="radio" name="radio_field" value={column.field} id={"radio_id_" + column.label} />{' '}
              {column.label}
            </Label>
          </FormGroup>
        );
      }
    });
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
          
          <Row>{this.renderDevice()}</Row>
          
          {/* MODAL ADD FILTER */}
          <Modal
            isOpen={showAddFilterModal}
            toggle={this.toggleAddFilterModal}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">Add Filter</h5>
              <button
                type="button"
                onClick={this.toggleAddFilterModal}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <FormGroup tag="fieldset" row>
                  <Col sm={12}>
                    <legend className="col-form-label col-sm-6">Choose field to filter:</legend>
                    {radioFilterView}
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </Modal>
          
          {/* MODAL ADD DEVICE */}
          <Modal
            isOpen={showAddDeviceModal}
            toggle={this.toggleAddDeviceModal}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">Add Device</h5>
              <button
                type="button"
                onClick={this.toggleAddDeviceModal}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AvForm onSubmit={this.handleSubmitAddDeviceModal}>
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
                <FormGroup>
                  <label htmlFor="image"> Image </label>
                  <Row>
                    <Col className="image-field-col">
                      <div className="image-wrapper">
                        <img
                          id="image-preview"
                          className=""
                          src={waspmote}
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
                      <Button type="submit" color="primary" className="mr-1">
                        Save
                      </Button>
                  </div>
                </FormGroup>
              </AvForm>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state.Device;
};

export default withRouter(connect(mapStatetoProps, { getDevice, updateStateDevice, getAllSensorForDevicePage, addDevice })(Device));
