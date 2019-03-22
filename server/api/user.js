const Express   = require('express');
const router    = Express.Router();
const Mutil     = require('../util');
const MD5       = Mutil.MD5;
const { user: User } = require('../schema');

// 获取所有的用户列表
router.get('/list',(req,res)=>{
    // 用户没有cookies
    User.findAll().then(list => {
        return res.json(list)
    })
})
// 注册
router.post('/register', (req, res) => {
    let { user,password,userType } = req.body;
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
                    type: userType
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
        attributes:['id','user','type','password'],
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
        return res.json({code:10,msg:'用户不存在！'})
    })
})
// 获取用户信息
router.get('/info', (req, res) => {
    const { userid } = req.cookies
    // 用户没有cookies
    if(!userid){return res.json({code:1,msg:'没有cookie'})}
    else{
        User.findOne({where:{id:userid}}).then(doc => {
            if(doc){return res.json({code:0,list:doc})}else{
                return res.json({code:1,msg:'用户不存在！'})
            }
        }).catch(err=>{
            return res.json({code:1,msg:'后端出错了！'})
        })
    }
    
})

module.exports = router;