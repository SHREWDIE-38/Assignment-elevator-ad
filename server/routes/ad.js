const router = require('express').Router();
const controller = require('./../controllers');

router.get('/', controller.ad.get);

module.exports = router;
