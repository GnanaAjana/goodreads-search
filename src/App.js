import React, { Component, Fragment } from 'react';
import './App.css';
import SearchBook from  './Components/SearchBook.js';
import Book from  './Components/Book.js';
import Paginating from "react-paginating";

var Axios = require('axios');
var convert = require('xml-js');

const API_KEY = 'vX2DeITm3UNOQoziy4DHA';

const LIMIT = 20;

const INITIAL_PAGE = 1;

class App extends Component {
  state = {
    searchTerm: '',
    searchResult: [],
    searching: false,
    error: '',
    currentPage: INITIAL_PAGE,
    totalCount: 0,
    pageCount: 20,
    initState: true
  }

  setPage = (page, callback = () => {}) => {
    this.setState({
      currentPage: page,
    }, callback);
  }

  handlePageChange = (page, e) => {
    this.setPage(page, () => {
      this.getBooks();
    });
  };

  searchBooks = () => {
    this.setPage(INITIAL_PAGE, () => {
      this.getBooks();
    });
  }

  onChange = e => {
    e.persist();
    this.setState({
      searchTerm: e.target.value,
    });
  };

  clearSearch = () => {
    this.setState({ 
      searchTerm: '', 
      searchResult: [], 
      totalCount: 0, 
      searching: false,
      initState: true
    })
  }

  getBooks = () => {
    let { currentPage, searchTerm }= this.state
    const url =
      `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${API_KEY}&q=${searchTerm}&page=${currentPage}`;
    this.setState({searching: true, initState: false});

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
          searching: false,
          searchResult: []
        });
      });

  }

  render() {
    let { error, currentPage, searchResult, totalCount, pageCount, searching, initState, searchTerm } = this.state;
    
    return (
      <Fragment>
        <div className="container header">
          <div className="title-image" onClick={this.clearSearch}>
            <img src="/goodreads-logo.png" alt="goodreads"/>
          </div>
          <SearchBook onChange={this.onChange} searchBooks={this.searchBooks} error={error} searchTerm={searchTerm} clearSearch={this.clearSearch}/>
        </div>
        {searching && (<div className="loading" />)}
        {(!initState && totalCount===0 && !searching) && (
          <div className="container">
            No Books found
          </div>
        )}
        {!!(totalCount > 0) && (
          <div className="container">
            {!!(!searching && totalCount > 20) && (<Paginating
              total={totalCount}
              limit={LIMIT}
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
            </Paginating>)}
            {!searching && (
              <div className="book-wrapper">
                {!!(searchResult.length > 0) ? (searchResult.map(item => (
                  <Book key={item.id._text} book={item} />
                ))) : 
                  (<Book key={searchResult.id._text} book={searchResult} />)
                }
              </div>
            )}
             {!!(!searching && totalCount > 20) && (
               <Paginating
               total={totalCount}
               limit={LIMIT}
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
             )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
