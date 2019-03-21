const Express = require('express');
const router = Express.Router();

router.get('/', (req, res) => {
    return res.json({
        code: 1
    })
})
router.use('/user', require('./user')); //登录、注册、忘记密码、上传图片
// router.use('/list', require('./list')); //科创专家列表、企业列表、个人的详细信息
// router.use('/unify', require('./unify')); //国家区号、城市地区、研究领域
// router.use('/my', require('./my')); //修改个人的信息、发布更新需求
// router.use('/about', require('./about'));
module.exports = router;