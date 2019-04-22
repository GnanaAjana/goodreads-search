import React from 'react';

const Book = props => {
  const { book  } = props || {};

  let imgUrl = book.best_book.small_image_url._text;

  return (
    <div className="book-item">
      <img className="image-container" src={imgUrl} alt={book.best_book.title._tex}/> 
      <div className="book-item-info">
        {book.best_book.title._text}
      </div>
    </div>
  )
}

export default Book;
