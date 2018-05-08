'use strict';

const DBService = require('./../services/lib/index');

class BookDAO extends DBService {
  constructor(deps) {
    super();
    const {
      config,
      uuidv4
    } = deps;

    this.config = config;
    this.uuidv4 = uuidv4;
    this.COLLECTION_NAME = 'book';
  }

  getCollectionName() {
    return this.COLLECTION_NAME;
  }

  createBook(book) {
    book.id = this.uuidv4();
    const data = {
      dbData: {
        entity: book
      }
    };

    return super.insert(data);
  }

  async findBook(id) {
    const data = {
      dbData: {
        query: {id: id}
      }
    };

    const res = await super.findOne(data);
    return res.dbData.result;
  }

  deleteBook(id) {
    const data = {
      dbData: {
        query: {id: id}
      }
    };

    return super.remove(data);

  }

  async getBooks() {
    const data = {
      dbData: {
        query: {},
        options: {
          sort: {
            dateCreated: -1
          },
          limit: this.config.book.maxEntriesLimit
        }
      }
    };

    const res = await super.find(data);
    return res.dbData.result;
  }


}

module.exports = BookDAO;
