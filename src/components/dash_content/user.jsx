import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { clearCookie }      from 'util';
import { logout }           from 'reduxs/user_redux';
import { Redirect }         from 'react-router-dom';
import { Result,List,WhiteSpace,Button,Modal } from 'antd-mobile'

const Item  = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
@connect(
    state=>state.userRedux,
    { logout }
)
class User extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    // 退出登录 清除cookie 清除userRedux redirectTo='/login'
    logout=()=>{
        alert('退出', '确定退出登录？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                clearCookie('userid');
                this.props.logout()
            }},
        ])
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
                        {userData.desc && userData.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {userData.money?<Brief>{userData.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace />
                <List className="logout-btn">
                    <Item><Button type='primary' onClick={this.logout}>退出登录</Button></Item>
                </List>
            </div>
        ):<Redirect to={userData.redirectTo} />
    }
}

export default User;