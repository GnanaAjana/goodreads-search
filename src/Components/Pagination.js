import React, { Component } from 'react';
import '../App.css';
import Paginating from "react-paginating";

class Pagination extends Component {

  render() {
    const { totalCount, pageCount, currentPage, handlePageChange, limit } = this.props;

    return(<Paginating
      total={totalCount}
      limit={limit}
      pageCount={pageCount}
      currentPage={currentPage}
    >
      {({
        pages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        previousPage,
        nextPage,
        totalPages,
        getPageItemProps
      }) => (
        <div className="pagination-wrapper">
          <button
            className="pagination-item"
            {...getPageItemProps({
              pageValue: 1,
              onPageChange: handlePageChange
            })}
          >
            First
          </button>

          {hasPreviousPage && (
            <button
              className="pagination-item"
              {...getPageItemProps({
                pageValue: previousPage,
                onPageChange: handlePageChange
              })}
            >
              {"<"}
            </button>
          )}

          {pages.map(page => {
            let activePage = null;
            if (currentPage === page) {
              activePage = { backgroundColor: "#ede6d6" };
            }
            return (
              <button
                className="pagination-item"
                {...getPageItemProps({
                  pageValue: page,
                  key: page,
                  style: activePage,
                  onPageChange: handlePageChange
                })}
              >
                {page}
              </button>
            );
          })}

          {hasNextPage && (
            <button
              className="pagination-item"
              {...getPageItemProps({
                pageValue: nextPage,
                onPageChange: handlePageChange
              })}
            >
              {">"}
            </button>
          )}

          <button
            className="pagination-item"
            {...getPageItemProps({
              pageValue: totalPages,
              onPageChange: handlePageChange
            })}
          >
            Last
          </button>
        </div>
      )}
    </Paginating>)
  }
}

export default Pagination;
