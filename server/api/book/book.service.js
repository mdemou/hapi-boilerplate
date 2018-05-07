'use strict';

const bookListModel = require('./models/bookListModel');
const bookModel = require('./models/bookModel');


function makeBookService({BookEntity, bookResponses}) {
  return {
    async getBooks(urlParams) {
      let myBook = BookEntity();
      let myBookList = await myBook.getBooks(urlParams);
      return bookListModel(myBookList);
    },

    async createBook(req) {
      let myBook = BookEntity();
      let resultBook = await myBook.createBook(req);
      return bookModel(resultBook);
    },

    async findBook(id) {
      let myBook = BookEntity();
      let resultBook = await myBook.findBook(id);
      return resultBook ? bookModel(resultBook) : Promise.reject(bookResponses.not_found_book_404);
    },

    async deleteBook(id) {
      let myBook = BookEntity();
      await myBook.deleteBook(id);
    }
  };
}

module.exports = makeBookService;
