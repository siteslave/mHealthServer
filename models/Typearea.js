var Q = require('Q');
var moment = require('moment');

exports.list = function (db, hospcode) {

    var q = Q.defer();

    db.raw('SELECT a.*,b.confirm_hospcode FROM (SELECT a.HOSPCODE,a.NAME, a.LNAME,a.SEX,a.BIRTH,a.CID, a.TYPEAREA,count(*)AS total FROM person a WHERE a.TYPEAREA IN("1", "3") GROUP BY a.CID HAVING total > 1 AND a.HOSPCODE = ? ORDER BY total DESC) a LEFT JOIN confirm_typearea b ON a.CID = b.cid', [hospcode])
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;
};

exports.detail = function (db, cid) {
    var q = Q.defer();
    db('person as p')
        .select('p.HOSPCODE', 'c.hosname' ,'p.CID', 'p.NAME', 'p.LNAME', 'p.SEX', 'p.BIRTH' ,'p.TYPEAREA' ,'p.D_UPDATE', 'c.confirm_hospcode')
        .leftJoin('chospital as c', 'p.HOSPCODE', 'c.hoscode')
        .leftJoin('confirm_typearea as t', 't.cid', 'p.CID')
        .where('p.CID', cid)
        .whereIn('p.TYPEAREA', ['1', '3'])
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};

exports.confirm = function (db, cid, hospcode) {
    var q = Q.defer();

    db('confirm_typearea')
        .insert({
            cid: cid,
            confirm_hospcode: hospcode,
            confirm_date: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};
