const express = require('express');
const router = express.Router();
const validator = require('../validators/register.validator');
var authController = require('../controllers/auth.controller');

router.post('/auth', authController.authenticate);
router.post('/auth/register', validator.register, authController.register);
router.post('/auth/password', authController.changePassword);

module.exports = {
  router: router,
};

