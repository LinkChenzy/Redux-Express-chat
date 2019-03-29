const Express   = require('express');
const router    = Express.Router();
const Mutil     = require('../util');
const MD5       = Mutil.MD5;
const { user: User,chat:Chat } = require('../schema');

// 获取所有的用户列表
router.get('/list',(req,res)=>{
    const { type } = req.query;
    // 用户没有cookies
    User.findAll({
        attributes: ['user', 'id', 'type', 'avatar', 'desc', 'company', 'money'],
        where:{type}
    }).then(list => {
        return res.json({code:0,list})
    })
})
// 注册
router.post('/register', (req, res) => {
    let { user,password,type } = req.body;
    // 查询用户名是否重复
    User.findOne({
            where: { user }
        }).then(doc => {
        if(doc){ return res.json({code:1,msg:'用户名重复！'})}
        else{
            // 创建新的用户
            User.create({
                    user,
                    password: MD5(password),
                    type: type
                }).then(doc => {
                    res.cookie("userid", doc.id);
                    return res.json({code:0,msg:"注册成功！"})
            }).catch(err=>{
                return res.json({code:10,msg:"注册失败！"})
            })
        }
    })
})

// 登录
router.post('/login',(req,res)=>{
    let { user,password } = req.body;
    User.findOne({
        attributes:['id','user',['type','type'],'password','avatar'],
        where:{user}
    }).then(doc=>{
        if(doc.password === MD5(password)){
            // 登录成功后设置cookie
            res.cookie("userid", doc.id);
            // 隐藏密码输出
            return res.json({code:0,msg:'登录成功！',list:doc})
        }else{
            return res.json({code:1,msg:'密码不正确！'})
        }
    }).catch(err=>{
        return res.json({code:10,msg:'用户不存在！',err})
    })
})
// 完善信息
router.post('/infoupdate',(req,res)=>{
    const { userid } = req.cookies
    const { avatar,title,company,money,desc } = req.body;
    if(!userid){return res.json({code:1,msg:'没有cookie'})}
    else{
        (async () => {
            // 查出需要改的用户
            const userList = await User.findOne({
                where:{id:userid}
            })
            User.update({avatar,title,company,money,desc},{where:{id:userid}}).then(doc=>{
                const list = Object.assign({},{
                    user: userList.user, type: userList.type
                },req.body)
                return res.json({code:0,msg:'更新成功！',list})
            }).catch(err=>{
                return res.json({code:1,msg:'更新失败！',err})
            })
        })();
        
    }
})
// 获取用户信息
router.get('/info', (req, res) => {
    const { userid } = req.cookies
    // 用户没有cookies
    if(!userid){return res.json({code:1,msg:'没有cookie'})}
    else{
        User.findOne({attributes:['user', 'id', 'type', 'avatar', 'desc', 'company', 'money','title'],where:{id:userid}}).then(doc => {
            if(doc){return res.json({code:0,list:doc})}else{
                return res.json({code:1,msg:'用户不存在！'})
            }
        }).catch(err=>{
            return res.json({code:1,msg:'后端出错了！',err})
        })
    }  
})

router.get('/chat',(req,res)=>{
    const { userid } = req.cookies;
    Chat.findAll().then(doc=>{
        return res.json({code:0,list:doc})
    })
})
module.exports = router;