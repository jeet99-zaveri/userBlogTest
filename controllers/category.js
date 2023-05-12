const CATEGORY = require('../models/category');

exports.addCategory = async (req, res, next) => {
    try {
        const payload = req.body;
        
        await CATEGORY.create(payload);

        return res.status(200).json({ status: true, message: "Category Added Successfully." });
    } catch (err) {
        next(err);
    }
};