const Joi = require('joi');
const { BLOG_STATUS } = require('../utils/enums');
Joi.objectId = require('joi-objectid')(Joi);

exports.addBlogVal = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.objectId().required(),
    })
}

exports.getAllBlogsVal = {
    query: Joi.object().keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.when('startDate', { is: Joi.exist(), then: Joi.date().required(), otherwise: Joi.date().optional() }),
        author: Joi.objectId().optional(),
        category: Joi.objectId().optional(),
    })
}

exports.updateBlogVal = {
    params: Joi.object().keys({
        id: Joi.objectId().required
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.objectId().required(),
        status: Joi.string().valid(...Object.values(BLOG_STATUS))
    })
};

exports.deleteBlogVal = {
    params: Joi.object().keys({
        id: Joi.objectId().required()
    })
};