const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const { isAuth } = require('../middlewares/auth');

const { addBlog, getAllBlogs, updateBlog, deleteBlog } = require('../controllers/blog');

const { addBlogVal, getAllBlogsVal, updateBlogVal, deleteBlogVal } = require('../validations/blog');

const { VALIDATION_OPTIONS } = require('../utils/enums');

router.post('/add', isAuth, validate(addBlogVal, VALIDATION_OPTIONS), addBlog);
router.get('/all', isAuth, validate(getAllBlogsVal, VALIDATION_OPTIONS), getAllBlogs);
router.put('/update/:id', isAuth, validate(updateBlogVal, VALIDATION_OPTIONS), updateBlog);
router.delete('/delete/:id', isAuth, validate(deleteBlogVal, VALIDATION_OPTIONS), deleteBlog);

module.exports = router;
