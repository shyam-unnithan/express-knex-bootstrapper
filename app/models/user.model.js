const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../../config/knex');
const BaseModel = require('./base.model');
// eslint-disable-next-line no-undef
const knex = Knex(knexConfig[process.env.NODE_ENV]);
Model.knex(knex);

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }
  static get relationMappings() {
    const UserProperties = require('./user.properties.model');

    return {
      usrpr: {
        relation: Model.HasOneRelation,
        modelClass: UserProperties,
        join: {
          from: 'user.id',
          to: 'user_properties.user',
        },
      },
    };
  }
}

module.exports = User;
