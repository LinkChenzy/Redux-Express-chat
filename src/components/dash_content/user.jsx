import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { Result,List,WhiteSpace,Button } from 'antd-mobile'

const Item  = List.Item;
const Brief = Item.Brief;
@connect(
    state=>state.userRedux
)
class User extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    render() {
        const userData = this.props;
        return this.props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${userData.avatar}.png`)} alt={userData.user} style={{width:50}} />}
                    title={userData.user}
                    message={<div>{userData.company ? userData.company :null}</div>}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine >
                        { userData.title } 
                        {userData.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {userData.money?<Brief>{userData.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace />
                <List className="logout-btn">
                    <Item><Button type='primary'>退出登录</Button></Item>
                </List>
            </div>
        ):null
    }
}

export default User;