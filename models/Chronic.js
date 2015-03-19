/** Chronic model **/
var Q = require('q');

exports.getDuplicated = function (db, hospcode, id , offset) {
    var q = Q.defer();
    db('mHealth_loss_chronic as m')
        .select('m.CID', 'm.PTNAME', 'm.BIRTH', 'm.SEX', 'm.DIAGCODE', 'm.DATE_SERV', 'm.HOSPCODE', 'c.hospname as HOSPNAME', 'm.GROUPCODE')
        .leftJoin('chospcode as c', 'c.hospcode', 'm.HOSPCODE')
        .where('m.HOSPCODE_PT', hospcode)
        //.where('m.GROUPCODE',id)
        .groupByRaw('m.CID, m.GROUPCODE')
        .limit(25).offset(offset)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};