import React, { Component } from "react";
import { Row, Col, Table } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { getDataCollection } from "../../store/actions";

import "../../assets/scss/custom.scss";

import PaginationBar from '../../components/PaginationBar/PaginationBar';

class DataCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { current_page, per_page } = this.props.meta;
    this.props.getDataCollection(this.props.history, { page: current_page, per_page });
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
    this.props.getDataCollection(this.props.history, { page: current_page, per_page });
  }

  renderDataCollection = () => {
    let { meta } = this.props;
    let paginationBarProps = {
      total: meta.total,
      currentPage: meta.current_page,
      sizePerPage: meta.per_page,
      handleChangePage: this.handleChangePage
    };

    return (
      <div className="data-collection-table">
        <Table responsive className="table-lg">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th><label>ID</label></th>
              <th><label>Waspmote ID</label></th>
              <th><label>Transaction ID</label></th>
              <th><label>Type</label></th>
              <th><label>Value</label></th>
              <th><label>Time</label></th>
            </tr>
          </thead>
          <tbody>
            {this.renderDataCollectionView()}
          </tbody>
        </Table>
        <PaginationBar {...paginationBarProps}/>
      </div>
    );

  }
  
  renderDataCollectionView = () => {
    const { data } = this.props;
    let view = [];
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        view.push(
          <tr key={item.id}>
          <td>{item.id}</td>
            <td>{item.waspmote_id}</td>
            <td>{item.transaction_id}</td>
            <td>{item.type}</td>
            <td>{item.value}</td>
            <td>{item.created_at}</td>
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
  const { errors, loading, data, meta } = state.DataCollection;
  return { errors, loading, data, meta };
};

export default withRouter(connect(mapStatetoProps, { getDataCollection })(DataCollection));
