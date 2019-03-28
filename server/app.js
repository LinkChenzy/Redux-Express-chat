const express   = require('express');
const app       = express();
const bodyParse = require('body-parser');
const cookieParse   = require('cookie-parser');
const ApiRouter     = require('./api');
const server        = require('http').Server(app);
const io            = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('sendmsg',(data)=>{
        console.log(data)
        socket.emit('recemsg',{msg:data.text})
    })
});

app.use(cookieParse());
app.use(bodyParse.json());
app.use('/api', ApiRouter);

// 允许跨域
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
server.listen(9070, (err) => {
    if(err){
        console.log('err', err)
    }else{
        console.log('express node 在9070启动成功！')
    }
})