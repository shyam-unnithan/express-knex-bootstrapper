const BaseModel = require('./base.model');
const User = require('./user.model');
const { Model } = require('objection');

class UserProperties extends BaseModel {
  static get tableName() {
    return 'user_properties';
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: user,
        join: {
          from: 'user_properties.user',
          to: 'user.id',
        },
      },
    };
  }
}
module.exports = UserProperties;
