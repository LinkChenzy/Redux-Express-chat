
// 页面跳转函数
export function getRedirectPath({type,avatar}){
    console.log(type,avatar)
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}
// 获取cookie
export function getCookie(name) {
    if (document.cookie.length > 0) {
        var begin = document.cookie.indexOf(name + '=')
        if (begin !== -1) {
            begin += name.length + 1 // cookie值的初始位置
            var end = document.cookie.indexOf(';', begin) // 结束位置
            if (end === -1) {
                end = document.cookie.length // 没有;则end为字符串结束位置
            }
            return document.cookie.substring(begin, end)
        }
    }
    return null
}
//设置cookie
export function setCookie(name, value, exdays) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    document.cookie = name + '=' + value + ';expires=' + exdate.toGMTString()
}
//清除cookie
export function clearCookie(name) {
    setCookie(name, "", -1); //修改2值都为空，天数为负1天就好了
}

export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_');
}