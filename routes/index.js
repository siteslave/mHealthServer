var express = require('express');
var router = express.Router();
var Typearea = require('../controllers/Typearea');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ok: true, msg: 'Welcome to Maha Sarakham Health Support System.'});
});

router.post('/typearea/list', Typearea.list);
router.post('/typearea/detail', Typearea.detail);
router.post('/typearea/confirm', Typearea.confirm);
router.post('/typearea/change', Typearea.changeTypearea);

module.exports = router;
