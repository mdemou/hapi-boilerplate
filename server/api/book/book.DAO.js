'use strict';


const config = require('./../../config/environment');
const DBService = require('./../services/lib/index');
const uuidv4 = require('uuid/v4');


class BookDAO extends DBService {

  constructor() {
    super();
    this.COLLECTION_NAME = 'book';
  }

  getCollectionName() {
    return this.COLLECTION_NAME;
  }

  createBook(book) {
    book.id = uuidv4();
    let data = {
      dbData: {
        entity: book
      }
    };

    return super.insert(data);
  }

  findBook(id) {
    let data = {
      dbData: {
        query: {id: id}
      }
    };

    return super.findOne(data);
  }

  deleteBook(id) {
    let data = {
      dbData: {
        query: {id: id}
      }
    };

    return super.remove(data);

  }

  getBooks() {
    let data = {
      dbData: {
        query: {},
        options: {
          sort: {
            dateCreated: -1
          },
          limit: config.book.maxEntriesLimit
        }
      }
    };

    return super.find(data);
  }


}

module.exports = BookDAO;
