const { JsonWebTokenError } = require('jsonwebtoken');

dotenv = require('dotenv');
jwt = require('jsonwebtoken');

dotenv.config({
  path: `env/.env.${process.env.NODE_ENV}`,
  debug: true,
});

exports.generateAuthToken = async function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

exports.validateToken = async function (token) {
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return { status: 500, user: payload.user };
  } catch (e) {
    if (e.name == 'JsonWebTokenError') {
      console.log('Invalid Token');
    } else if (e.name == 'TokenExpiredError') {
      console.log('Token Expired');
    } else {
      console.error(e);
    }
    return { status: 401, user: {} };
  }
};
