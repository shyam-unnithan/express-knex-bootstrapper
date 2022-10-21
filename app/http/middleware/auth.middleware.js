const jwt = require('../../lib/jwt');
const constants = require('../responses/constants');
const { JsonWebTokenError } = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  const openPaths = ['/api/auth/register', '/api/auth', '/api/auth/'];
  if (openPaths.includes(req.path)) return next();
  const token = req.header('Authorization');
  if (!token)
    return res
      .status(constants.UNAUTHORIZED)
      .json({ message: constants.MSG_UNAUTHORIZED });
  try {
    const validation = await jwt.validateToken(token.substring(4));
    if (validation.status == 401) {
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: constants.MSG_UNAUTHORIZED });
    } else {
      req.user = validation.user;
    }
    next();
  } catch (e) {
    if (e === JsonWebTokenError) {
      console.log('Invalid Token');
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: constants.MSG_UNAUTHORIZED });
    } else {
      console.log(e);
    }
  }
};
