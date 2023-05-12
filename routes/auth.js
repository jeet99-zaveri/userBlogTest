var express = require('express');
var router = express.Router();
const { validate } = require('express-validation');

const { registerUser, loginUser } = require('../controllers/auth');

const { login, register } = require('../validations/auth');

const { VALIDATION_OPTIONS } = require('../utils/enums');

router.post('/register', validate(register, VALIDATION_OPTIONS), registerUser);

router.post('/login', validate(login, VALIDATION_OPTIONS), loginUser);

module.exports = router;
