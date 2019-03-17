const express   = require('express');
const app       = express();
// const { user: User } = require('./schema');
const UserController = require('./controllers/user')
app.get('/',(req,res)=>{
    res.send('hello world')
});

// app.get('/userlist', UserController.getUserList);
app.get('/userlist', (req, res) => {
    res.send('hello world')
});

// 允许跨域
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.listen(9070,(err)=>{
    if(err){
        console.log('err', err)
    }else{
        console.log('express node启动成功！')
    }
})