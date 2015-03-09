/** Chronic controller **/
var Chronic = require('../models/Chronic');

exports.getDuplicated = function (req, res) {
    var db = req.db;
    var key = req.body.key;
    var hospcode = req.body.hospcode;

    if (key == req.session.key) {
        Chronic.getDuplicated(db, hospcode)
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