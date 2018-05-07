'use strict';

function bookList(books) {
  let formattedBooks = [];

  books.forEach((book) => {

    formattedBooks.push({
      bookUuid: book.id,
      author: book.author,
      title: book.title,
      read: book.read,
      price: book.price
    });
  });

  return formattedBooks;
}

module.exports = bookList;