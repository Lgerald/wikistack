const express = require('express');
const router = express.Router();
module.exports = router;

const userRouter = require('./user');
const wikiRouter = require('./wiki');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);