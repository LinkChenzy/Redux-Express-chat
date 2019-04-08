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
        if (!this.props.chatRedux.chatmsg.length) {
            this.props.getChatList()
            this.props.receMsg()    
        }
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
        const users     = this.props.chatRedux.users;
        const toId      = this.props.match.params.user; 
        const { text }  = this.state;
        const Item      = List.Item;
        // 当前用户的id
        const userid    = this.props.userRedux.id;
        // 目标用户的id
        // const targetId = this.props.match.params.user;
        if(!users[toId]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[toId].name}
                </NavBar>

                {msgList.map(v => {
                    const avatar = require(`../../components/img/${users[v.from].avatar}.png`)
                    return Number(v.from) === userid ? (
                        <List key={v.id}>
                            <Item
                                className='chat-me'
                                extra={<img alt='头像' src={avatar} />}                                
                            >{v.content}</Item>
                        </List>
                    ) : (
                            <List key={v.id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
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