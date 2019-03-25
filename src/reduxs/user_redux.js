import Axios                from 'axios';
import { Toast }            from "antd-mobile";
import { getRedirectPath }  from 'util';

const AUTH_SUCCESS      = 'AUTH_SUCCESS';
const LOADDATA          = 'LOADDATA';
const ERROR             = 'ERROR';
const initState ={
    redirectTo: '',
    msg:'',
    user:'',
    password:'',
    userType:''
};
export function userRedux(state=initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            }
        case LOADDATA:
            return {
                ...state,isAuth: true,...action.payload,
            }
        case ERROR:
            return {...state,isAuth:false,msg:action.msg}
        default: 
            return state;
    }
}

export function authSuccess(data) {
    return { type: AUTH_SUCCESS, payload:data }
}
// 获取用户信息函数
export function LOAD_FN(data){
    return { type:LOADDATA,payload:data}
}
export function ERROR_FN(msg) {
    return { msg,type:ERROR }
}
// 失败函数
export function Error(msg) {
    return Toast.fail(msg)
}
// 成功函数
export function Success(msg) {
    return Toast.success(msg)
}

// 注册
export function register(data) {
    return dispatch=>{
        Axios.post('/api/user/register',data)
            .then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess(data));
                    Toast.success(res.data.msg)
                }else{
                    dispatch(ERROR_FN(res.data.msg))
                    Error(res.data.msg)
                }
            })
    }
}

// 登录
export function login(data) {
    return dispatch=>{
        Axios.post('/api/user/login', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.list));
                    Toast.success(res.data.msg)
                } else {
                    dispatch(ERROR_FN(res.data.msg));
                    Error(res.data.msg)
                }
            })
    }
}
// 更新用户个人信息
export function infoUpdate(data) {
    return dispatch => {
        Axios.post('/api/user/infoupdate', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.list));
                    Toast.success(res.data.msg)
                } else {
                    dispatch(ERROR_FN(res.data.msg));
                    Error(res.data.msg)
                }
            })
    }
}