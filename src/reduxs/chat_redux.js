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
                unread: action.payload.data.filter(v => !v.read && Number(v.to) === action.payload.userid).length
            }
        case 'MSG_RECE':
            // 发送人的id和当前的id相等时 未读消息加一
            const n = Number(action.payload.to) === action.userid ? 1:0;
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread + n
            }
        // case 'MSG_READ':
        //     return {
        //         ...state,
        //         chatmsg: action.payload,
        //         unread: action.payload.filter(v => !v.read).length
        //     }
        default:
            return state;
    }
}

export function msgListSuccess(data, users, userid) {
    return {
        type: MSG_LIST,
        payload: {data,users,userid}
    }
}
export function msgRecv(data, userid) {
    return {
        userid,
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
    return (dispatch,getState )=> {
        Axios.get('/api/user/chat')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // 获取原始state的用户id
                    const userid = getState().userRedux.id;
                    dispatch(msgListSuccess(res.data.list, res.data.users, userid));
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
    return (dispatch,getState) => {
        socket.on('recemsg',data=>{
            // 获取原始state的用户id
            const userid = getState().userRedux.id;
            dispatch(msgRecv(data, userid))
        })
    }
}