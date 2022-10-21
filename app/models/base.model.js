const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../../config/knex');
// eslint-disable-next-line no-undef
const knex = Knex(knexConfig[process.env.NODE_ENV]);
Model.knex(knex);

class BaseModel extends Model {
  $parseDatabaseJson(json) {
    delete json.created_at;
    delete json.updated_at;
    return json;
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = BaseModel;
