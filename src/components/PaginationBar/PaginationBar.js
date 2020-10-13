import React, { Component } from 'react';
import {
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

class PaginationBar extends Component {
  render() {
    const { total, currentPage, sizePerPage, handleChangePage } = this.props;
    let pages = Math.ceil(total / sizePerPage);
    let limitToDisplay = 5;
    let page = currentPage - 1;
    let pageGroupIndex = (page - (page % limitToDisplay)) / limitToDisplay;
    let view = [];

    if (pages > 0 && (1 + (pageGroupIndex * limitToDisplay)) <= pages) {
      let length = (pageGroupIndex + 1) * limitToDisplay < pages ? (pageGroupIndex + 1) * limitToDisplay : pages;
      for (let i = (1 + (pageGroupIndex * limitToDisplay)); i <= length; i++) {
        view.push(
          <PaginationItem key={i} active={i === currentPage}>
            <PaginationLink tag="button" onClick={() => {
              handleChangePage(null, i)
            }}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }

    return (
      <Pagination>
        <PaginationItem hidden={pages <= 1 || currentPage === 1}>
          <PaginationLink previous tag="button" onClick={() => {
            handleChangePage('prev', null)
          }}>&lt;</PaginationLink>
        </PaginationItem>
        {view}
        <PaginationItem hidden={pages <= 1 || currentPage === pages}>
          <PaginationLink next tag="button" onClick={() => {
            handleChangePage('next', null)
          }}>&gt;</PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}

export default PaginationBar;