var express = require('express');
var router = express.Router();

router.use('/category', require('./category'));
router.use('/blog', require('./blog'));
router.use('/auth', require('./auth'));

module.exports = router;
