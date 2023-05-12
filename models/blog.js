const { Schema, model } = require('mongoose');
const ObjectID = Schema.Types.ObjectId;
const { BLOG_STATUS } = require('../utils/enums');

const BlogSchema = new Schema({
	title: { type: String, default: null },
	description: { type: String, default: null },
	publishDate: { type: Date, default: new Date() },
	modifyDate: { type: Date, default: null },
	status: { type: String, default: BLOG_STATUS.PUBLISHED, enum: [...Object.values(BLOG_STATUS)] },
	author: { type: ObjectID, ref: 'user', default: null },
	category: { type: ObjectID, ref: 'category', default: null },
});

module.exports = model('blog', BlogSchema, 'blogs');