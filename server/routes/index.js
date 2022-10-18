const express = require('express');
const router = express.Router();
const adRouter = require('./ad');
const userRouter = require('./user');

router.use('/ad', adRouter);
router.use('/user', userRouter);

module.exports = router;