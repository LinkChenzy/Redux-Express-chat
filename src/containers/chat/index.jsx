import React                from 'react';
import { List,InputItem,NavBar,Icon,Grid }   from 'antd-mobile';
import { connect }          from 'react-redux'
import { getChatList, sendMsg, receMsg } from 'reduxs/chat_redux'
import { getChatId }                     from 'util';

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
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
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
        const { text,showEmoji }  = this.state;
        const Item      = List.Item;
        // 表情
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))
        // 当前用户的id
        const userid    = this.props.userRedux.id;
        // 目标用户的id
        const targetId = this.props.match.params.user;
        if (!users[targetId]){
            return null
        }
        // 筛选符合chatid的聊天记录
        const msgs = msgList.filter(v=> v.chatid === getChatId(userid,targetId));
        return (
            <div id='chat-page'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[targetId].name}
                </NavBar>

                {msgs.map(v => {
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
                            extra={
                                <div>
                                    <span
                                        role="img" aria-label="emoji"
                                        style={{ marginRight: 15 }}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !showEmoji
                                            })
                                            this.fixCarousel()
                                        }}>😃</span>
                                    <span onClick={()=>this.handleSend()}>Send</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    { showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => {
                            this.setState({
                                text: text + el.text
                            })

                        }}
                    /> : null}
                </div>
            </div>
            
        );
    }
}

export default Chat;