var express = require('express');
var router = express.Router();
var Typearea = require('../controllers/Typearea');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/typearea/list', Typearea.list);
router.post('/typearea/detail', Typearea.detail);

module.exports = router;
