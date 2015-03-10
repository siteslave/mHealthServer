var Q = require('q');

exports.getVersion = function (db) {
    var q = Q.defer();

    db('mHealth_version')
        .orderBy('released_date')
        .limit(1)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0]);
        });

    return q.promise;
};