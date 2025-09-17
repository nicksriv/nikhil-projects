var userCount = 0;
var userMap = {};
var User = require('./user');

function UserManager() {

    if (!(this instanceof UserManager)) {
        throw new Error("Illegal initiation!");
        return;
    }
    this.update = function (obj) {
        socket = obj.socket;
    };
}

UserManager.prototype.createUser = function (uName, h) {
    userCount++;
    userMap[h] = new User(uName, h);
}

UserManager.prototype.delUser = function (h) {
    userCount--;
    delete userMap[h];

}

UserManager.prototype.getUser = function (h) {
    if (!userMap[h]) {
        throw new Error("No user with map " + h);
        return null;
    }
    return userMap[h];
}

UserManager.prototype.getConnectedUsers = function (h) {
    /* if(!userMap) {
        throw new Error("No user with map " + h);
    }*/
    var res = [];
    for (var x in userMap) {
        if (userMap[x].isConnected()) {
            res.push({
                name: userMap[x].getName(),
                hash: x
            });
        }

    }
    return res;
}

UserManager.prototype.bindUser = function () {

}

module.exports = new UserManager();