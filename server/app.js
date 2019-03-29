const express   = require('express');
const app       = express();
const bodyParse = require('body-parser');
const cookieParse   = require('cookie-parser');
const ApiRouter     = require('./api');
const server        = require('http').Server(app);
const io            = require('socket.io')(server);
const { user: User,chat:Chat } = require('./schema');

// 判断是否存在这个表，没有则创建新的
Chat.sync({
    force: false
}).then(() => {
    console.log("[Chat is success]");
}).catch(e=>{ 
    Chat.sync();
})
User.sync({
    force: false
}).then(() => {
    console.log("[User is success]");
}).catch(e => {
    User.sync();
})

io.on('connection', function (socket) {
    socket.on('sendmsg',(data)=>{
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg}).then(doc=>{
            const _doc = Object.assign(doc,{read:false})
            io.emit('recemsg', _doc)
        }).catch(e=>{
            console.log('e', e)
        })
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