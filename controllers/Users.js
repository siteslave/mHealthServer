var Users = require('../models/Users');
var _ = require('lodash');
var rnd = require('random-key');

exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Users.doLogin(req.db, username, password)
        .then(function (rows) {
            if(_.size(rows)) {
                // Generate
                var key = rnd.generateBase30(15);
                var fullname = rows[0].firstname;

                req.session.key = key;
                req.session.hospcode = rows[0].lastname;

                res.send({
                    ok: true,
                    key: key,
                    fullname: fullname,
                    hospcode: rows[0].lastname
                });

            } else {
                res.send({ok: false, msg: 'Login failed'})
            }
        }, function (err) {
            res.send({ok: false, msg: err});
        });

};