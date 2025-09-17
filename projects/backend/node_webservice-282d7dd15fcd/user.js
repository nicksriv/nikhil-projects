var userCount = 0;

function User(uName, h) {
    var _id = null,
        status = null,
        socket = null,
        connectedTo = [],
        userName = uName,
        hash = h,
        to = null;
    if (!(this instanceof User)) {
        throw new Error("Illegal initiation!");
        return;
    }

    this.update = function (obj) {
        socket = obj.socket;
        _id = obj.socket.id;
        registerSocket();
    };
    this.emit = function (event, msg) {
        console.log("Emitting " + event + " " + msg);
        socket.emit(event, msg);
    }
    this.getName = function () {
        return userName;
    }
    this.on = function (event, cb) {
        socket.on(event, cb);
    }
    this.setTo = function (toUser) {
        to = toUser;
    }
    this.isConnected = function () {
        if (socket != null) {
            return true;
        }
        return false;
    }
    var registerSocket = function () {

        socket.on('chat message', function (msg) {
            console.log('chat message from ' + userName + " " + msg);
            //socket.emit('hello from socket');
            //io.emit('chat message', msg);
        });
        socket.on('disconnect', function (msg) {
            console.log('Disconnecting ' + userName + " " + msg);
            userCount--;
            //socket.emit('hello from socket');
            //io.emit('chat message', msg);
        });

        socket.on('connect', function (msg) {
            console.log('connecting ' + userName + " " + msg);

        });
        socket.on('error', function (msg) {
            console.log('error ' + userName + " " + msg);

        });
        socket.on('reconnect', function (msg) {
            console.log('reconnected ' + userName + " " + msg);

        });
        socket.on('reconnect_attempt', function (msg) {
            console.log('reconnect_attempt ' + userName + " " + msg);

        });
        socket.on('reconnecting', function (msg) {
            console.log('reconnecting ' + userName + " " + msg);

        });
        socket.on('reconnect_error', function (msg) {
            console.log('reconnect_error ' + userName + " " + msg);

        });
        socket.on('reconnect_failed', function (msg) {
            console.log('reconnect_failed ' + userName + " " + msg);

        });

        socket.on('private chat', function (msg) {
            console.log('private chat ' + userName + "  " + msg);
            if (to != null) {
                to.emit('private chat', msg);
            }
        });
    }
    userCount++;
}

User.prototype.getUserCount = function () {
    return userCount;
}





module.exports = User;