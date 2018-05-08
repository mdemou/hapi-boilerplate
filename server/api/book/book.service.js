'use strict';

const bookListModel = require('./models/bookListModel');
const bookModel = require('./models/bookModel');

function makeBookService(deps) {
  const {
    bookResponses,
    bookDAO
  } = deps;

  return {
    async getBooks(urlParams) {
      const myBookList = await bookDAO.getBooks(urlParams);
      return bookListModel(myBookList);
    },

    async createBook(req) {
      await bookDAO.createBook(req);
      return bookModel(req);
    },

    async findBook(id) {
      const resultBook = await bookDAO.findBook(id);
      return resultBook ? bookModel(resultBook) : Promise.reject(bookResponses.not_found_book_404);
    },

    async deleteBook(id) {
      await bookDAO.deleteBook(id);
    }
  };
}

module.exports = makeBookService;
