/** Chronic model **/
var Q = require('q');

exports.getDuplicated = function (db, hospcode) {
    var q = Q.defer();

    /*
     select m.CID, m.PTNAME, m.BIRTH, m.SEX, m.DIAGCODE, m.DATE_SERV, m.HOSPCODE, c.hospname
     from mHealth_loss_chronic as m
     LEFT JOIN chospcode as c on c.hospcode=m.HOSPCODE
     where m.HOSPCODE_PT="04916"
     */
    db('mHealth_loss_chronic as m')
        .select('m.CID', 'm.PTNAME', 'm.BIRTH', 'm.SEX', 'm.DIAGCODE', 'm.DATE_SERV', 'm.HOSPCODE', 'c.hospname as HOSPNAME')
        .leftJoin('chospcode as c', 'c.hospcode', 'm.HOSPCODE')
        .where('m.HOSPCODE_PT', hospcode)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};