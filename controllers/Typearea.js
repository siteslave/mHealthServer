var Typearea = require('../models/Typearea');

exports.list = function (req, res) {
    var db = req.db;
    var hospcode = req.body.hospcode;

    Typearea.list(db, hospcode)
        .then(function (rows) {
            res.send({ok: true, rows: rows});
        }, function (err) {
            res.send({ok: false, msg: err});
        });
};