const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { ROLES } = require('../utils/enums');
const { SALT_ROUNDS } = require('../config');

const UserSchema = new Schema({
	firstName: { type: String, default: null },
	lastName: { type: String, default: null },
	email: { type: String, default: null },
	password: { type: String, default: null },
	dob: { type: Date, default: null },
	role: { type: String, default: 'user', enum: [...Object.values(ROLES)] },
});

module.exports = model('user', UserSchema, 'users');