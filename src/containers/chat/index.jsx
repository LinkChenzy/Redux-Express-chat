import React from 'react';
import { List,InputItem } from 'antd-mobile';
import io from 'socket.io-client';

const socket = io('ws://localhost:9070');

class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',msg:[]
        }
    }
    componentDidMount(){
        socket.on('recemsg',(data)=>{
            console.log(data)
            this.setState({
                msg:[...this.state.msg,data]
            })
        })
    }
    handleSend=()=>{
        socket.emit('sendmsg',{text:this.state.text})
        this.setState({text:''})
        console.log(this.state)
    }
    render(){
        const { text,msg } = this.state;
        return (
            <div>
                {msg.map((v,i)=>{
                    return <p key={i}>{v.msg}</p>
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