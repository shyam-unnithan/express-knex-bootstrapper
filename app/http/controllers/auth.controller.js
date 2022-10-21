const { response } = require('express');
var authService = require('../../services/auth.service');
var responseConstants = require('../responses/constants');
var jwt = require('../../lib/jwt');


/** TODO - Code for user authentication*/
exports.authenticate = async function (req, res) {
  try {
    var authStatus = await authService.authenticate(req.body);
    if (authStatus.status === 200) {
      const payload = {
        user: authStatus.user,
      };
      var authToken = await jwt.generateAuthToken(payload);
      return res.status(responseConstants.SUCCESS).json({
        status: response.SUCCESS,
        data: { authToken: authToken, user: authStatus.user },
      });
    } else {
      return res.status(responseConstants.SUCCESS).json({
        status: responseConstants.UNAUTHORIZED,
        message: responseConstants.AUTH_FAILED,
      });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(responseConstants.FAILURE)
      .json({ status: responseConstants.FAILURE, message: e.message });
  }
};

/** TODO - Code for user registration */
exports.register = async function (req, res) {
  try {
    const registrationStatus = await authService.register(req.body);
    if (registrationStatus === 200) {
      return res.status(responseConstants.SUCCESS).json({
        status: responseConstants.SUCCESS,
      });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(responseConstants.FAILURE)
      .json({ status: responseConstants.FAILURE, message: e.message });
  }
};

/** TODO - Code for password Change */
exports.changePassword = async function (req, res) {
  try {
    const token = req.header('Authorization');
    var status = await jwt.validateToken(token.substring(4));
    const changepassword={username:status.user.username,password:req.body.currentPassword,newpassword:req.body.newPassword}
    var passwordChangeStatus = await authService.changePassword(changepassword);
    if (passwordChangeStatus.status === 200) {
      return res.status(responseConstants.SUCCESS).json({
        status: responseConstants.SUCCESS,
        data: passwordChangeStatus,
      });
    } else {
      return res.status(responseConstants.SUCCESS).json({
        status: responseConstants.UNAUTHORIZED,
        message: responseConstants.AUTH_FAILED,
      });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(responseConstants.FAILURE)
      .json({ status: responseConstants.FAILURE, message: e.message });
  }
};
