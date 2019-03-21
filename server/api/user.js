const Express = require('express');
const router = Express.Router();

router.get('/info',(req,res)=>{
    // 用户没有cookies
    return res.json({code:1})
})


module.exports = router;