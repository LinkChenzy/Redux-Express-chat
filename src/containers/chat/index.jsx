import React                from 'react';
import { List,InputItem,NavBar,Icon }   from 'antd-mobile';
import { connect }          from 'react-redux'
import { getChatList, sendMsg, receMsg } from 'reduxs/chat_redux'

@connect(
    state=>state,
    { getChatList, sendMsg, receMsg }
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',msg:[]
        }
    }
    componentDidMount(){
        this.props.getChatList()
        this.props.receMsg()
    }
    handleSend=()=>{
        const from = this.props.userRedux.id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''})
    }
    render(){
        const msgList   = this.props.chatRedux.chatmsg;
        const { text }  = this.state;
        const Item      = List.Item;
        // 当前用户的id
        const userid    = this.props.userRedux.id
        // 目标用户的id
        // const targetId = this.props.match.params.user;
        return (
            <div id='chat-page'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    正在和:{this.props.match.params.user} 聊天
                </NavBar>

                {msgList.map(v => {
                    // const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v.id}>
                            <Item
                                className='chat-me'
                                // thumb={avatar}
                            >我发的：{v.content}</Item>
                        </List>

                    ) : (
                            <List key={v.id}>
                                <Item
                                    // extra={<img alt='头像' src={avatar} />}
                                >对方发的：{v.content}</Item>
                            </List>

                        )
                })}
                
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={text}
                            onChange={v=>{this.setState({
                                text:v
                            })}}
                            extra={<span onClick={()=>this.handleSend()}>Send</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
            
        );
    }
}

export default Chat;