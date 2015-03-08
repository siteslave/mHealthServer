var express = require('express');
var router = express.Router();
var Users = require('../controllers/Users');

/* GET users listing. */
router.post('/login', Users.login);

module.exports = router;
