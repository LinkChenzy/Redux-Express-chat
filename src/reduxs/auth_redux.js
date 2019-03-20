
import Axios from "axios";

const LOGIN     = "LOGIN";
const LOGOUT    = "LOGOUT";
const initState = {
    isAuth: false,
    username: "chen"
}
const USERDATA = 'USERDATA';

export function Auth(state = initState, action) {
    switch(action.type){
        case "LOGIN":
            return {...state,isAuth:true}
        case "LOGOUT":
            return {...state,isAuth:false}
        case "USERDATA":
            return {...state,...action.payload}
        default:
            return state;
    }
}

export function getUserData() {
    return dispatch=>{
        Axios({
            method: 'get',
            url: '/userlist'
        }).then(res => {
            dispatch(userdata(res.data))
        })
    }
}
// data的类型是对象
export function userdata(data) {
    return {
        type: USERDATA,payload:data
    }
}
export function login(){
    return {type:LOGIN}
}
export function logout() {
    return {
        type: LOGOUT
    }
}