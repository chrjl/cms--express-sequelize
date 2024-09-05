const express = require('express');
const router = express.Router();

const posts = require('./posts');
const keywords = require('./keywords');

router.use('/posts', posts)
router.use('/keywords', keywords)

module.exports = router;
