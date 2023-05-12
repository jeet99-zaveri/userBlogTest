const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

exports.isAuth = async (req, res, next) => {
    try {
        if (req?.headers?.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token, JWT_SECRET_KEY);

            req.user = {
                id: decoded._id,
                role: decoded.role,
                email: decoded.email,
            };

            next();
        } else {
            throw new Error("You're not allow to access this endpoint.");
        }
    } catch (err) {
        next(err);
    }
};