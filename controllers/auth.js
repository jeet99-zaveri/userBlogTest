const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, SALT_ROUNDS } = require('../config');

const USER = require('../models/user');

/**
 * Register a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.registerUser = async (req, res, next) => {
    try {
        const payload = req.body;

        payload.password = await bcrypt.hash(payload.password, +(SALT_ROUNDS))
        const user = await USER.create(payload);

        const token = await jwt.sign({ email: user.email, id: user._id, role: user.role }, JWT_SECRET_KEY);

        return res.status(200).json({ status: true, message: 'User created successfully.', token });
    } catch (err) {
        next(err);
    }
};

/**
 * Login a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.loginUser = async (req, res, next) => {
    try {
        const payload = req.body;

        const user = await USER.findOne({ email: payload.email });
        if (!user) throw new Error('Invalid emailID or password');

        const isMatch = await bcrypt.compare(payload.password, user.password);
        if (!isMatch) throw new Error('Invalid emailID or password');

        const token = await jwt.sign({ email: user.email, id: user._id, role: user.role }, JWT_SECRET_KEY);

        return res.status(200).json({ status: true, message: 'User logged in successfully.', token });
    } catch (err) {
        next(err);
    }
};