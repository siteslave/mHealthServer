var Q = require('Q');

exports.list = function (db, hospcode) {

    var q = Q.defer();

    db.raw('SELECT a.HOSPCODE,a.NAME, a.LNAME, a.TYPEAREA, a.SEX,a.BIRTH,a.CID,COUNT(*) AS total FROM person a WHERE a.TYPEAREA  in("1","3") GROUP BY a.CID HAVING total >1 AND a.HOSPCODE=? ORDER BY a.NAME DESC', [hospcode])
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};