import React, { PureComponent } from 'react';
import '../App.css';


class SearchBook extends PureComponent {
  search = (e) => {
    e.preventDefault();
    this.props.searchBooks();
  }

  render() {
    let  { error, clearSearch, searchTerm = '', onChange } = this.props;

    return (
      <div>
        <form onSubmit={this.search}>
          <input className="search-field" value={searchTerm} onChange={onChange} type="text" placeholder="Search books here" autoComplete="off" name="book" required></input>
          <button type="submit" className="search-action">Search</button>
          {searchTerm && (
            <button type="button" className="search-action" onClick={clearSearch}>Clear</button>
          )}
          {error && (<div className="error">{error}</div>)}
        </form>
      </div>
    )
  }
}

export default SearchBook;
