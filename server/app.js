const express   = require('express');
const app       = express();
const ApiRouter = require('./api');
// const { user: User } = require('./schema');
const UserController = require('./controllers/user')


app.use('/api', ApiRouter);

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
        console.log('express node 在9070启动成功！')
    }
})