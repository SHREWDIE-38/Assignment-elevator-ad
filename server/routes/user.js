const router = require('express').Router();
const controller = require('./../controllers');

router.post('/', controller.user.post)

module.exports = router;