import React, { Component } from "react";
import { Row, Col, Table, Card, CardBody  } from "reactstrap";
import Select from 'react-select';

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDataCollection, updateState } from "../../store/actions";

import "../../assets/scss/custom.scss";

import PaginationBar from '../../components/PaginationBar/PaginationBar';

class DataCollection extends Component {
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
          label: "Transaction ID",
          field: "transaction_id"
        },
        {
          label: "Type",
          field: "type"
        },
        {
          label: "Value",
          field: "value"
        },
        {
          label: "Time",
          field: "created_at"
        },
      ]
    };
  }

  componentDidMount() {
    let { current_page, per_page } = this.props.meta;
    this.props.getDataCollection(this.props.history, { page: current_page, per_page }, this.props.sort);
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
    this.props.getDataCollection(this.props.history, { page: current_page, per_page }, this.props.sort);
  }

  handleChange = selectedOption => {
    let { meta } = this.props;
    //call action change page
    this.props.getDataCollection(this.props.history, {
      ...meta,
      per_page: selectedOption.value
    }, this.props.sort);
  
  };

  handleOnclickSort = (e) => {
    let { meta, sort } = this.props;
    let order = 'asc';
    if (e.target.id === sort.order_by) {
      if (sort.order === 'asc'){
        order = 'desc';
      }
    }
    this.props.getDataCollection(this.props.history, meta, {
      order_by: e.target.id,
      order
    });
  }

  renderDataCollection = () => {
    let { meta, sort } = this.props;
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
          { 
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

    return (
      <Col xl={12}>
        <Card>
          <CardBody>
            <div className="data-collection-container">
              <div className="data-collection-container-view">
                <label>View</label>
                <Select
                  value={{value: meta.per_page, label: meta.per_page}}
                  onChange={this.handleChange}
                  options={options}
                  className="data-collection-container-select"
                />
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
                  {this.renderDataCollectionView()}
                </tbody>
              </Table>
              <PaginationBar {...paginationBarProps}/>
            </div>
          </CardBody>
        </Card>
      </Col>
    );

  }
  
  renderDataCollectionView = () => {
    const { data } = this.props;
    const { columns } = this.state;
    let view = [];
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        const renderView = () => {
          let view = [];
          columns.forEach((column, index) => {
            view.push(
              <td key={'td_'+column.field}>{item[`${column.field}`]}</td>
            );
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

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">DataCollection</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Welcome to Libelium Project
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          
          <Row>{this.renderDataCollection()}</Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { errors, loading, data, meta, sort } = state.DataCollection;
  return { errors, loading, data, meta, sort };
};

export default withRouter(connect(mapStatetoProps, { getDataCollection, updateState })(DataCollection));
