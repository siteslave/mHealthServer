var express = require('express');
var router = express.Router();
var Users = require('../controllers/Users');

/* GET users listing. */
router.post('/login', Users.login);

router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = router;
