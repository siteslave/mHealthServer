var Q = require('Q');
var moment = require('moment');

exports.list = function (db, hospcode) {

    var q = Q.defer();

    db.raw('SELECT a.*,b.confirm_hospcode FROM (SELECT a.HOSPCODE,a.`NAME`,a.SEX,a.BIRTH,a.CID, a.TYPEAREA,count(*)AS total FROM person a WHERE a.TYPEAREA IN("1", "3") GROUP BY a.CID HAVING total > 1 AND a.HOSPCODE = ? ORDER BY total DESC) a LEFT JOIN confirm_typearea b ON a.CID = b.cid', [hospcode])
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;
};

exports.detail = function (db, cid) {
    var q = Q.defer();

    /*
     SELECT HOSPCODE,chospital.hosname,CID,`NAME`,LNAME,SEX,BIRTH,TYPEAREA,D_UPDATE FROM person
     LEFT JOIN chospital ON person.HOSPCODE=chospital.hoscode
     WHERE CID='1449900384355'
     AND TYPEAREA in('1','3')
     */
    db('person as p')
        .select('p.HOSPCODE', 'c.hosname' ,'p.CID', 'p.NAME', 'p.LNAME', 'p.SEX', 'p.BIRTH' ,'p.TYPEAREA' ,'p.D_UPDATE')
        .leftJoin('chospital as c', 'p.HOSPCODE', 'c.hoscode')
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
