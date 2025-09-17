var crypto = require('crypto');

//crypto.createHash('md5').update('test1122').digest('hex')

var users = {
    'papri': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    },
    'shanks': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    },
    'nicks': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    },
    'tom': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    },
    'john': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    },
    'harry': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    },
    'shanksdroid': {
        'pass': '1d87b77ce89ce4822cc67b2046747b8d'
    }

}

    function Auth() {
        if (!(this instanceof Auth)) return new Auth();
    }

Auth.prototype.checkCredentials = function (user, passHash) {

    return users[user] && users[user].pass && crypto.createHash('md5').update(passHash).digest('hex') === users[user].pass;
}

module.exports = Auth;