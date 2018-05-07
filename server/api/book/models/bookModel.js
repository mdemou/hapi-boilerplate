'use strict';

function book(book) {
  return {
    bookUuid: book.id,
    author: book.author,
    title: book.title,
    read: book.read,
    price: book.price
  };
}

module.exports = book;