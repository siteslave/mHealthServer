var Typearea = require('../models/Typearea');
var _ = require('lodash');

exports.list = function (req, res) {
    var db = req.db;
    var hospcode = req.session.hospcode;
    var key = req.body.key;

    if (key == req.session.key) {
        Typearea.list(db, hospcode)
            .then(function (rows) {
                var total = _.size(rows);
                var people = _.sample(rows, 50);
                res.send({ok: true, rows: people, total: total});
            }, function (err) {
                res.send({ok: false, msg: err});
            });
    } else {
        res.send({ ok: false, msg: 'Invalid key, please login again.' });
    }
};

exports.detail = function (req, res) {
    var db = req.db;
    var key = req.body.key;
    var cid = req.body.cid;

    if (key == req.session.key) {
        Typearea.detail(db, cid)
            .then(function (rows) {
                res.send({ok: true, rows: rows});
            }, function (err) {
                console.log(err);
                res.send({ok:false, msg: err});
            });
    } else {
        res.send({ ok: false, msg: 'Invalid key, please login again.' });
    }

};

exports.confirm = function (req, res) {
    var db = req.db;
    var key = req.body.key;
    var cid = req.body.cid;

    if (key == req.session.key) {
        Typearea.confirm(db, cid, req.session.hospcode)
            .then(function () {
                res.send({ok: true});
            }, function (err) {
                console.log(err);
                res.send({ok:false, msg: err});
            });
    } else {
        res.send({ ok: false, msg: 'Invalid key, please login again.' });
    }

};
