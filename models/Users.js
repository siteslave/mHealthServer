/**
 * Users Model
 */

var Q = require('q');
var md5 = require('MD5');

exports.doLogin = function (db, username, password) {
    var q = Q.defer();

    db('sys_member')
        .select('username', 'firstname','lastname', 'officename')
        .where('username', username)
        .where('password', md5(password))
        .where('status', 'yes')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
