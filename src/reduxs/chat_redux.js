import io           from 'socket.io-client';
import Axios        from 'axios';

const socket = io('ws://localhost:9070');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECE = 'MSG_RECE';
// 标识已读信息
const MSG_READ = 'MSG_READ';
const ERROR = 'ERROR';
const initState = {
    chatmsg: [],
    users: {},
    unread:0
};
export function chatRedux(state = initState, action) {
    // console.log('action', action.payload)
    switch (action.type) {
        case 'MSG_LIST':
            return {
                ...state,
                users:action.payload.users,
                chatmsg: action.payload.data,
                unread:action.payload.data.filter(v=>!v.read).length
            }
        case 'MSG_RECE':
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread + 1
            }
        case 'MSG_READ':
            return {
                ...state,
                chatmsg: action.payload,
                unread: action.payload.filter(v => !v.read).length
            }
        default:
            return state;
    }
}

export function msgListSuccess(data,users) {
    return {
        type: MSG_LIST,
        payload: {data,users}
    }
}
export function msgRecv(data) {
    return {
        type: MSG_RECE,
        payload: data
    }
}
export function receSuccess(data) {
    return {
        type: MSG_READ,
        payload: data
    }
}
export function ERROR_FN(msg) {
    return {
        msg,
        type: ERROR
    }
}

// 获取消息列表
export function getChatList(type) {
    return dispatch => {
        Axios.get('/api/user/chat')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgListSuccess(res.data.list, res.data.users));
                } else {
                    dispatch(ERROR_FN(res.data.msg))
                }
            })
    }
}
// 发送消息函数
export function sendMsg({from,to,msg}) {
    return dispatch => {
        socket.emit('sendmsg',{from,to,msg})
    }
}
// 接受消息函数
export function receMsg() {
    return dispatch => {
        socket.on('recemsg',data=>{
            dispatch(msgRecv(data))
        })
    }
}