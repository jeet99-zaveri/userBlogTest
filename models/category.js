const { Schema, model } = require('mongoose');
const ObjectID = Schema.Types.ObjectId;

const CategorySchema = new Schema({
    name: { type: String },
    parentCategory: { type: ObjectID, ref: "category", default: null },
});

module.exports = model('category', CategorySchema, 'categories');