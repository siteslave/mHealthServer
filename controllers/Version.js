var Q = require('q');
var Version = require('../models/Version');

exports.getVersion = function (req, res) {

    // get last version
    Version.getVersion(req.db)
        .then(function (data) {

            var currentVersion = data.current_version;
            var releasedDate = data.released_date;
            var whatNew = data.what_new;
            var url32 = data.url_32;
            var url64 = data.url_64;

            res.send({
                ok: true,
                url32: url32,
                url64: url64,
                version: currentVersion,
                released_date: releasedDate,
                what_new: whatNew
            });

        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};