const moment = require('moment');

const BLOGS = require('../models/blog');
const CATEGORY = require('../models/category');

const { PAGE_SIZE } = require('../config');

/**
 * Add a blog API Method
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.addBlog = async (req, res, next) => {
    try {
        const payload = req.body;
        payload.author = req.user.id;

        const findCategory = await CATEGORY.findOne({ _id: payload.category });
        if (!findCategory) throw new Error('Category is not available. Please check.');

        const newBlog = await BLOGS.create(payload);

        return res.status(200).json({ status: true, message: 'Blogs Created Successfully.', data: newBlog });
    } catch (err) {
        next(err);
    }
};

/**
 * Get All Blogs API Methods
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getAllBlogs = async (req, res, next) => {
    try {
        const reqQuery = req.query;
        let limit = reqQuery.limit ?? PAGE_SIZE;
        let skip = 0;
        let page = reqQuery.page ?? 1;

        if (page != 1) skip = page * limit;

        let query = {};

        if (req.user.role == 'user') query.author = req.user.id;

        if (reqQuery.startDate && reqQuery.endDate)
            query.publishDate = { $gte: moment(reqQuery.startDate).toISOString(), $lte: moment(reqQuery.endDate).toISOString() };

        if (reqQuery.author && req.user.role == 'admin') {
            const findAuthor = await AUTHOR.findOne({ _id: reqQuery.author });
            if (!findAuthor) throw new Error('Invalid Author ID');

            query.author = findAuthor._id;
        }

        if (reqQuery.category) {
            const findCategory = await CATEGORY.findOne({ _id: reqQuery.category });
            if (!findCategory) throw new Error('Invalid Category ID');

            query.category = findCategory._id;
        }

        const blogs = await BLOGS.find(query, '-_v').populate({ path: 'category', select: 'name' }).skip(skip).limit(limit);

        return res.status(200).json({ status: true, message: "Get Blogs Data Successfully.", data: blogs })

    } catch (err) {
        next(err);
    }
};

/**
 * Update a Blog API Method
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateBlog = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const payload = req.body;
        let query = { _id };

        if (req.user.role == 'user') query.author = req.user.id;

        const blog = await BLOGS.findOne(query);
        if (!blog) throw new Error('Blog is not available.');

        if (payload.category) {
            const findCategory = await CATEGORY.find({ _id: payload.category });
            if (!findCategory) throw new Error('Invalid Category ID');
        }

        blog.title = payload.title;
        blog.description = payload.description;
        blog.category = payload.category;
        blog.status = payload.status;
        blog.modifyDate = new Date();
        await blog.save();

        return res.status(200).json({ status: true, message: "Blog updated successfully.", data: blog });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a blog API method
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteBlog = async (req, res, next) => {
    try {
        const _id = req.params.id;
        let query = { _id };

        if (req.user.role == 'user') query.author = req.user.id;

        const blog = await BLOGS.findOne(query);
        if (!blog) throw new Error('Blog is not available.');

        await blog.remove();

        return res.status(200).json({ status: true, message: "Blog deleted successfully." });
    } catch (err) {
        next(err);
    }
};