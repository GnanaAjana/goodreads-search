import React, { Component, Fragment } from 'react';
import './App.css';
import SearchBook from  './Components/SearchBook.js';
import Book from  './Components/Book.js';
import Paginating from "react-paginating";

var Axios = require('axios');
var convert = require('xml-js');

const API_KEY = 'vX2DeITm3UNOQoziy4DHA';

const limit = 20;

class App extends Component {
  state = {
    searchTerm: '',
    searchResult: [],
    searching: false,
    error: '',
    currentPage: 1,
    totalCount: 0,
    pageCount: 20,
    initState: true
  }

  handlePageChange = (page, e) => {
    let { searchTerm } = this.state;
    this.setState({
      currentPage: page,
    });
    this.getBooks(searchTerm, page);
  };

  searchBooks = (term) => {
    let { currentPage } = this.state;
    this.setState({ searchTerm: term })
    this.getBooks(term, currentPage);
  }

  getBooks = (term, pageState) => {
    const url =
      `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${API_KEY}&q=${term}&page=${pageState}`;
    this.setState({searching: true, initState: false})
    Axios.get(url)
      .then(res => {
        var result1 = convert.xml2json(res.data, { compact: true , spaces: 4 });
        let result = JSON.parse(result1);
        let searchResult = result.GoodreadsResponse.search.results.work;
        let totalCount = parseInt(result.GoodreadsResponse.search['total-results']._text);
        console.log('searchResult', searchResult)
        this.setState({ searchResult, totalCount, searching: false })
      })
      .catch(error => {
        this.setState({
          error: error.toString(),
          searching: false
        });
      });

  }

  render() {
    let { error, currentPage, searchResult, totalCount, pageCount, searching, initState } = this.state;
    
    return (
      <Fragment>
        <div className="container header">
          <div className="title-image">
            <img src="/goodreads-logo.png" alt="goodreads" />
          </div>
          <SearchBook searchBooks={this.searchBooks} error={error}/>
        </div>
        {searching && (<div className="loading" />)}
        {(!initState && totalCount===0 && !searching) && (
          <div className="container">
            No Books found
          </div>
        )}
        {!!(totalCount > 0) && (
          <div className="container">
            <Paginating
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
                      onPageChange: this.handlePageChange
                    })}
                  >
                    First
                  </button>

                  {hasPreviousPage && (
                    <button
                      className="pagination-item"
                      {...getPageItemProps({
                        pageValue: previousPage,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      {"<"}
                    </button>
                  )}

                  {pages.map(page => {
                    let activePage = null;
                    if (currentPage === page) {
                      activePage = { backgroundColor: "#fdce09" };
                    }
                    return (
                      <button
                        className="pagination-item"
                        {...getPageItemProps({
                          pageValue: page,
                          key: page,
                          style: activePage,
                          onPageChange: this.handlePageChange
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
                        onPageChange: this.handlePageChange
                      })}
                    >
                      {">"}
                    </button>
                  )}

                  <button
                    className="pagination-item"
                    {...getPageItemProps({
                      pageValue: totalPages,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    Last
                  </button>
                </div>
              )}
            </Paginating>
            {!searching && (
              <div className="book-wrapper">
                {!!(searchResult.length > 0) ? (searchResult.map(item => (
                  <Book key={item.id._text} book={item} />
                ))) : 
                  (<Book key={searchResult.id._text} book={searchResult} />)
                }
              </div>
            )}
            
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
