const { check, validationResult } = require('express-validator');
const constants = require('./constants');
const authService = require('../../services/auth.service');

const checkUserExists = async function (username) {
  var user = await authService.findUserByUsername(username);
  if (user.length !== 0) {
    return Promise.reject(constants.USERNAME_EXISTS);
  }
};

exports.register = [
  check('username', constants.MSG_INVALID_USERNAME)
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail()
    .matches(/@nissanmotor.com\s*$/),
  check('password', constants.MSG_PASSWORD_MIN_LENGTH).isLength({
    min: constants.MIN_PASSWORD_LENGTH,
  }),
  check('username', constants.MSG_INVALID_USERNAME).custom(checkUserExists),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    } else {
      next();
    }
  },
];
