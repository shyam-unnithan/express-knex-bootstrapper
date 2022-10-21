const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
var messages = require('./constants');
const constants = require('./constants');
const Userproperties = require('../models/user.properties.model');

exports.register = async function (userObj) {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userObj.password, salt);
    var user = {
      email: userObj.username,
      first_name: userObj.first_name,
      last_name: userObj.last_name,
      encrypted: password,
    };
    await User.query().insert(user);
    return constants.USER_REGISTRATION_SUCCESS;
  } catch (e) {
    console.log(e);
    throw Error(messages.FAILURE_FETCHING_DATA);
  }
};

const getPropertiesById = async function (id) {
  try {
    var userprop = await Userproperties.query()
      .select('name', 'value')
      .where('user', '=', id);
    return userprop;
  } catch (e) {
    console.log(e);
    throw Error(constants.FAILURE_FETCHING_DATA);
  }
};

exports.authenticate = async function (auth) {
  const authStatus = await authenticateUser(auth);
  return authStatus;
};

const authenticateUser = async function (auth) {
  try {
    var authStatus = { status: constants.AUTH_FAILURE, user: {} };
    console.log(auth.username);
    var user = await User.query()
      .select('id', 'email', 'encrypted')
      .where('email', '=', auth.username);
    user = user[0];
    if (user !== undefined) {
      const isMatch = await bcrypt.compare(auth.password, user.encrypted);
      if (isMatch) {
        // delete user.encrypted;
        authStatus.status = constants.AUTH_SUCCESS;
        authStatus.info = await getPropertiesById(user.id);
        authStatus.user = {
          id: user.id,
          username: user.email,
          info: authStatus.info,
        };
        return authStatus;
      } else {
        return authStatus;
      }
    } else {
      return authStatus;
    }
  } catch (e) {
    console.log(e);
    throw Error(messages.FAILURE_FETCHING_DATA);
  }
};

exports.changePassword = async function (passwordChange) {
  const passwordChangeStatus = await authenticateUser(passwordChange);
  if (passwordChangeStatus.status == 200) {
    updatePassword(passwordChange);
  } else {
    passwordChangeStatus.status = 401;
  }
  return passwordChangeStatus;
};

const updatePassword = async function (passwordChange) {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordChange.newpassword, salt);
    var user = {
      encrypted: password,
      updated_at: new Date(),
    };
    await User.query()
      .update(user)
      .where('email', '=', passwordChange.username);
    return constants.USER_REGISTRATION_SUCCESS;
  } catch (e) {
    console.log(e);
    throw Error(messages.FAILURE_FETCHING_DATA);
  }
};

exports.findUserByUsername = async function (username) {
  try {
    var user = await User.query()
      .select('id', 'email', 'first_name', 'last_name')
      .where('email', '=', username);
    return user;
  } catch (e) {
    console.log(e);
    console.log(e);
    throw Error(messages.FAILURE_FETCHING_DATA);
  }
};
