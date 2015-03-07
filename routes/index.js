var express = require('express');
var router = express.Router();
var Typearea = require('../controllers/Typearea');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/list', Typearea.list);

router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = router;
