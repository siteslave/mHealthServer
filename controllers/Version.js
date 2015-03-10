var Q = require('q');
var Version = require('../models/Version');

exports.getVersion = function (req, res) {

    // get last version
    Version.getVersion(req.db)
        .then(function (data) {

            var currentVersion = data.current_version;
            var releasedDate = data.released_date;
            var whatNew = data.what_new;
            var url = data.url;

            res.send({
                ok: true,
                url: url,
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