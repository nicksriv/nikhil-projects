var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bp = require('body-parser');
var auth = require('./Auth')();
var UserManager = require('./UserManager');
var path = require('path');

app.use(bp.json({}));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));
app.post('/login', function (req, res) {
    console.log("login req : ");
    console.log(req.body);
    if (auth.checkCredentials(req.body.user, req.body.pass)) {
        console.log("login success");
        var hash =  'hash_' + parseInt(Math.random() * 10000, 10);
        UserManager.createUser(req.body.user,hash);
        console.log('New hash ' + hash);
        res.status(200).send({
            'status': "Success",
            'hash': hash
        });
    } else {
        res.status(401).send("Invalid Credentials");
    }
});
io.use(function (socket, next) {
    console.log('use socket ');
    //console.log(socket.request.headers);
    next();
    /* if (socket.request.headers.cookie) return next();
  next(new Error('Authentication error'));*/
});
io.on('connection', function (socket) {
    console.log('Connected >>>>>>>>>>>>>>>>>>>');
    console.log(socket.request._query);
    var user, hash = socket.request._query.auth_token;
    console.log(hash);
    try {
        user = UserManager.getUser(hash);
        user.update({
            'socket': socket
        });
        io.emit('connected users', JSON.stringify(UserManager.getConnectedUsers()) );
        user.on('disconnect', function(msg){
            console.log(user.getName() + ' Disconnected!');
            UserManager.delUser(hash);
             io.emit('connected users', JSON.stringify(UserManager.getConnectedUsers()) );
        });
        user.on('connect to', function (msg) {
            console.log('connecting ' + user.getName() + " to " + msg);
            var toUser = UserManager.getUser(msg);
            console.log(toUser);
            user.setTo (toUser);
        });
        user.on('private chat', function (msg) {
            var js = JSON.parse(msg);
            var txt = js.msg;
            var toHash = js.hash;
            UserManager.getUser(toHash).emit('private chat', JSON.stringify({hash: hash, msg:txt}));
            console.log('private chat to ' + UserManager.getUser(toHash).getName() + " from  " + user.getName() + " " + txt);
            
        });
        io.emit('chat message', user.getName() + ' Joined us :)');
    } catch (e) {
        console.log(e);
    }
    //console.log(socket.id);
    /*socket.on('chat message', function (msg) {
        console.log('chat message' + msg);
        socket.emit('hello from socket');
        //io.emit('chat message', msg);
    });*/
});

http.listen(80, function () {
    console.log('listening on *:80');
});