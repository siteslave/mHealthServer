var Q = require('Q');

exports.list = function (db, hospcode) {

    var q = Q.defer();

    db('person as p')
        .select('p.HOSPCODE', 'p.NAME', 'p.LNAME', 'p.TYPEAREA', 'p.SEX', 'p.BIRTH', 'p.CID', db.raw('COUNT(*) AS total'))
        //.leftJoin('confirm_typearea as c', 'c.cid', 'p.CID')
        .whereIn('p.TYPEAREA', ['1', '3'])
        .groupBy('p.CID')
        .havingRaw('total > ?', [1])
        .having('p.HOSPCODE', '=', hospcode)
        .orderBy('p.NAME', 'DESC')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
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
