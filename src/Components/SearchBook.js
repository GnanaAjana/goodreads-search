import React, { PureComponent } from 'react';
import '../App.css';


class SearchBook extends PureComponent {
  searchInput = React.createRef();
  search = (e) => {
    e.preventDefault();
    let { value } = this.searchInput || {};
    if (value && value.length !== 0) {
      let { searchBooks } = this.props;
      searchBooks(value);
    }
  }

  render() {
    let  { error } = this.props;
    return (
      <div>
        <form onSubmit={this.search}>
          <input className="search-field" ref={(input) => this.searchInput = input} type="text" placeholder="Search books here" autoComplete="off" name="book" required></input>
          <button type="submit" className="search-action">Search</button>
          {error && (<div className="error">{error}</div>)}
        </form>
      </div>
    )
  }
}

export default SearchBook;
