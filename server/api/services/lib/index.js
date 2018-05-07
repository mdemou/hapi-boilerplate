'use strict';

const CODE_ENTITY_EXISTS = 11000;
const config = require('./../../../config/environment');
const Responses = require('./dbServiceResponses');
const Global = require('./../global.service');

class DBService {

  constructor() {
    /*
     * Method from parent class to be implemented at all the children to know de collection name from the repository
     */
    if (this.getCollectionName === undefined) {
      throw new TypeError('Children class must implement method getCollectionName');
    }
  }

  /**
   * Method from parent class to get the collection
   * @public
   * @return {Object} result - The collection
   */
  getCollection() {
    let collectionName = this.getCollectionName();
    return Global.getConfigValue('db').collection(collectionName);
  }

  /**
   * Method from parent class to persist a entity
   * @public
   * @return {Object} data.payload - The entity
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let options = data.dbData.options || {};

      collection.insert(data.dbData.entity, options, (err, response) => {
        if (err) {
          if (err.code === CODE_ENTITY_EXISTS) {
            return reject(Responses.entity_exists);
          } else {
            return reject(Responses.internal_ddbb_error);
          }
        }
        data.dbData.response = response;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to persist some entities
   * @public
   */
  insertMany(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let options = data.dbData.options || {};

      collection.insertMany(data.dbData.entities, options, (err, response) => {
        if (err) {
          if (err.code === 11000) {
            return reject(Responses.some_entity_exists);
          } else {
            return reject(Responses.internal_ddbb_error);
          }
        }
        data.dbData.response = response;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to retrieve a entity
   * @public
   * @return {Object} data.entity - The entity
   */
  findOne(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let projection = data.dbData.projection || {};
      let options = data.dbData.options || {};

      collection.findOne(data.dbData.query, options, (err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to retrieve a entity
   * @public
   * @return {Object} data.entity - The entity
   */
  find(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let projection = data.dbData.projection || {};
      let queryLimit = data.dbData.options.limit || config.defaults.mongo.limit;
      let options = data.dbData.options || {};
      let sortFields = data.dbData.options.sort || {};

      collection.find(data.dbData.query).project(projection).sort(sortFields).limit(queryLimit).toArray((err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to get distincs
   * @public
   * @return {Object} data.entity - The entity
   */
  distinct(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let distinct = data.dbData.distinct;

      collection.distinct(distinct, (err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to count the number of entities of a query
   * @public
   * @return {Object} data.entity - The entity
   */
  count(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let options = data.dbData.options || {};

      collection.count(data.dbData.query, options, (err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to find a modify a entity
   * @public
   * @return {Object} data - The container
   */
  findAndModify(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();

      let query = data.dbData.query;
      let update = data.dbData.entity;
      let options = data.dbData.options || {};
      let sort = data.dbData.sort || {};

      collection.findAndModify(query, sort, update, options, (err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result;
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to update an entity
   * @public
   * @param {Object} data - The container object
   * @param {Object} data.dbData - The object with the mongo query
   * @return {Promise}
   */
  update(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let query = data.dbData.query;
      let update = data.dbData.entity;
      let options = data.dbData.options || {};

      collection.update(query, update, options, (err, response) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        } else {
          data.dbData.response = response;
          return resolve(data);
        }
      });
    });
  }

  /**
   * Method from parent class for removing an object
   * @public
   * @param {Object} data - The container object
   * @param {Object} data.query - The object with the mongo query
   * @return {Promise}
   */
  remove(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      let options = {};
      if (data.dbData.query == undefined || Object.keys(data.dbData.query).length === 0) {
        return reject(Responses.condition_not_found);
      }
      if (data.dbData.options) {
        options = data.dbData.options;
      }
      collection.remove(data.dbData.query, options, (err) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        return resolve(data);
      });
    });
  }


  /**
   * Method from parent class to retrieve a entity biggest by parameter
   * @public
   * @return {Object} data.entity - The entity
   */
  findMax(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      collection.find(data.dbData.query).sort(data.dbData.fieldMax).limit(1).toArray((err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result.pop();
        return resolve(data);
      });
    });
  }

  /**
   * Method from parent class to use aggregate method
   * @public
   * @param {Object} data - The container object
   * @param {Object} data.dbData.query - The object with the mongo query
   * @return {Promise}
   * @return {Object} data.dbData.result - The entity returned by the DDBB
   */
  aggregate(data) {
    return new Promise((resolve, reject) => {
      let collection = this.getCollection();
      collection.aggregate(data.dbData.query, (err, result) => {
        if (err) {
          return reject(Responses.internal_ddbb_error);
        }
        data.dbData.result = result;
        return resolve(data);
      });
    });
  }

}

module.exports = DBService;