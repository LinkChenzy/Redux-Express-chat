import Axios from 'axios';
import { Toast } from "antd-mobile";

const USELIST_SUCCESS = 'USELIST_SUCCESS';
const ERROR = 'ERROR';
const initState = {
    userList:[]
};
export function userlistRedux(state = initState, action) {
    switch (action.type) {
        case USELIST_SUCCESS:
            return { ...state, userList:action.payload }
        default:
            return state;
    }
}

export function userlistSuccess(data) {
    return {
        type: USELIST_SUCCESS,
        payload: data
    }
}

export function ERROR_FN(msg) {
    return {
        msg,
        type: ERROR
    }
}
// 失败函数
export function Error(msg) {
    return Toast.fail(msg)
}
// 成功函数
export function Success(msg) {
    return Toast.success(msg)
}

// 获取牛人列表
export function getUserList(type) {
    return dispatch => {
        Axios.get('/api/user/list?type='+ type)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(userlistSuccess(res.data.list));
                } else {
                    dispatch(ERROR_FN(res.data.msg))
                    Error(res.data.msg)
                }
            })
    }
}
