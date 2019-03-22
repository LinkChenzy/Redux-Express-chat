import Axios from 'axios';
import { Toast } from "antd-mobile";
// import { getRedirectPath } from 'util';

// 登录注册之后的跳转函数
const getRedirectPath = ({userType,avatar})=>{
    let url = (userType === 'boss') ? '/boss' : '/genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}
const LOGIN_SUCCESS     = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS  = 'REGISTER_SUCCESS';
const LOADDATA          = 'LOADDATA';
const ERROR             = 'ERROR';
const initState ={
    redirectTo: '',
    isAuth:false,
    msg:'',
    user:'',
    password:'',
    userType:''
};
export function userRedux(state=initState,action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth:true,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth:true,
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

export function LOGIN(data) {
    return { type: LOGIN_SUCCESS, payload:data }
}
export function REGISTER(data) {
    return { type: REGISTER_SUCCESS, payload: data }
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
                    dispatch(REGISTER(data));
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
                    dispatch(LOGIN(data));
                    Toast.success(res.data.msg)
                } else {
                    dispatch(ERROR_FN(res.data.msg));
                    Error(res.data.msg)
                }
            })
    }
}