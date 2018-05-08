'use strict';

const CreateBookModel = require('./models/joi/BookCreateJoi');

function makeBookController({loggingService, errorService, responsesService, bookService, bookResponses, schemaService}) {
  return {
    async getLastBooks(request, h) {
      let response;
      try {        
        loggingService.info(__filename, 'getLastBooks', {example: {subexample: 'more content'}});
        const books = await bookService.getBooks();
        response = responsesService.createResponseData(
          bookResponses.get_books_ok,
          {books});
        return h.response(response.body).code(response.statusCode);
      } catch (error) {
        loggingService.error(__filename, 'getLastBooks', error);
        response = errorService.createGeneralError(error);
      }
      return h.response(response.body).code(response.statusCode);
    },

    async createBook(request, h) {
      let response;
      try {
        let newObj = Object.assign(request.payload, request.params);
        await schemaService.validateSchema(newObj, new CreateBookModel());
        const resultBook = await bookService.createBook(request.payload);
        response = responsesService.createResponseData(
          bookResponses.created_book_ok,
          resultBook);
      } catch (error) {
        response = errorService.createGeneralError(error);
      }
      return h.response(response.body).code(response.statusCode);
    },

    async updateBook(request, h) {
      try {
        let newObj = Object.assign(request.payload, request.params);
        await schemaService.validateSchema(newObj, new CreateBookModel());
        let resultBook = await bookService.updateBook(request.payload);
        let response = responsesService.createResponseData(
          bookResponses.updated_book_ok,
          resultBook);
        return h.response(response.body).code(response.statusCode);
      } catch (error) {
        let response = errorService.createGeneralError(error);
        return h.response(response.body).code(response.statusCode);
      }
    },

    async deleteBook(request, h) {
      let response;
      try {
        await bookService.deleteBook(request.params.id);
        response = responsesService.createResponseData(bookResponses.deleted_book_ok);
      } catch (error) {
        response = errorService.createGeneralError(error);
      }
      return h.response(response.body).code(response.statusCode);
    },
    
    async getBook(request, h) {
      let response;
      try {
        let resultBook = await bookService.findBook(request.params.id);
        response = responsesService.createResponseData(
          bookResponses.found_book_ok,
          resultBook);

      } catch (error) {
        response = errorService.createGeneralError(error);
      }
      return h.response(response.body).code(response.statusCode);
    }
  };
}

module.exports = makeBookController;