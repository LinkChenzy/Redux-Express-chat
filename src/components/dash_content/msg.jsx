import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { List, Badge }      from 'antd-mobile'

@connect(
    state => state
)
class Msg extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    getLastItem=(arr)=>{
        return arr[arr.length-1]
    }
    render() {
        const Item      = List.Item
        const Brief     = Item.Brief
        const chatmsg   = this.props.chatRedux.chatmsg;
        const userid    = this.props.userRedux.id;
        const userinfo  = this.props.chatRedux.users;
        
        let MsgGroup    = {}
        chatmsg.forEach(e => {
            MsgGroup[e.chatid] = MsgGroup[e.chatid] || [];
            MsgGroup[e.chatid].push(e);
        });
        const chatList = Object.values(MsgGroup).sort((a, b) => { 
            // 时间格式转化成时间戳
            const a_creat = this.getLastItem(a).createdAt;
            const a_time = new Date(a_creat.replace(/-/g, '/')).getTime();
            const b_creat = this.getLastItem(b).createdAt;
            const b_time = new Date(b_creat.replace(/-/g, '/')).getTime();
            return b_time - a_time;
        })
        return (
            <div>
                {chatList.map((v,i)=>{
                    const lastItem = this.getLastItem(v);
                    const targetId = Number(v[0].from) === userid ? v[0].to:v[0].from;
                    const unreadNum = v.filter(v=>!v.read && Number(v.to) === userid ).length;
                    if(!userinfo[targetId]){ return null }
                    return (
                        <List key={i}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                <Brief>{userinfo[targetId].name}</Brief>
                                {lastItem.content}
                            </Item>
                        </List>
                    );
                })}
            </div>
        );
    }
}

export default Msg;