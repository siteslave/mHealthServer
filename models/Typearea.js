var Q = require('q');
var moment = require('moment');

exports.list = function (db, hospcode) {

    var q = Q.defer();
    var sql = [
        'SELECT a.HOSPCODE, a.NAME, a.LNAME, a.TYPEAREA, a.SEX, a.BIRTH, a.CID, c.confirm_hospcode',
        'FROM (SELECT a.NAME, a.LNAME, a.TYPEAREA, a.SEX, a.BIRTH, a.CID, a.HOSPCODE',
        'FROM person a',
        'WHERE a.TYPEAREA in(?, ?)',
        'GROUP BY a.CID',
        'HAVING count(*) >1 AND a.HOSPCODE=?) as a',
        'LEFT JOIN confirm_typearea as c on c.cid=a.CID',
        'group by a.CID'
    ].join(' ');

    db.raw(sql, ['1', '3', hospcode])
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;
};

exports.detail = function (db, cid, hospcode) {
    var q = Q.defer();
    db('person as p')
        .select('p.HOSPCODE', 'c.hospname' ,'p.CID', 'p.NAME', 'p.LNAME', 'p.SEX', 'p.BIRTH' ,'p.TYPEAREA' ,'p.D_UPDATE', 't.confirm_hospcode')
        .leftJoin('chospcode as c', 'p.HOSPCODE', 'c.hospcode')
        .leftJoin('confirm_typearea as t', 't.cid', 'p.CID')
        .where('p.CID', cid)
        .whereIn('p.TYPEAREA', ['1', '3'])
        .where('p.HOSPCODE', '!=', hospcode)
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

exports.changeTypearea = function (db, cid, typearea, hospcode) {
    var q = Q.defer();

    db('person')
        .where('CID', cid)
        .where('HOSPCODE', hospcode)
        .update({
            TYPEAREA: typearea
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.checkDuplicatedConfirm = function (cid) {
    var q = Q.defer();

    db('confirm_typearea')
        .where('cid', cid)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });
    
    return q.promise;
};

exports.addLog = function (db, typearea, cid, hospcode, username) {
    var q = Q.defer();

    db('mHealth_typearea_log')
        .insert({
            username: username,
            cid: cid,
            hospcode: hospcode,
            old_typearea: old_typearea,
            new_typearea: new_typearea,
            created_at: moment('YYYY-MM-DD HH:mm:ss')
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};