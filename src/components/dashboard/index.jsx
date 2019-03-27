import React, { Component } from 'react';
import NavFooter            from 'components/navfooter'
import { NavBar }           from 'antd-mobile';
import { connect }          from 'react-redux';

function Boss() {
    return <h1>BOSS首页</h1>
}
function Genius() {
    return <h1>Genius首页</h1>
}
function Msg() {
    return <h1>消息首页</h1>
}
function User() {
    return <h1>个人user主页</h1>
}

@connect(
    state=>state
)
class Dashboard extends Component {
    render() {
        const user      = this.props.userRedux;
        console.log('user', user)
        console.log(user.type === 'boss')
        const pathname  = this.props.location.pathname;
        const navList   = [
            { path:'/boss',  text:'牛人', icon:'boss',title:'牛人列表',component:Boss,hide:user.type === 'genius' },
            { path:'/genius',  text:'BOSS', icon:'job',title:'BOSS列表',component:Genius,hide:user.type === 'boss' },
            { path:'/msg',  text:'消息', icon:'msg',title:'消息列表',component:Msg },
            { path:'/user',  text:'个人主页', icon:'user',title:'个人主页',component:User },
        ]
        return (
            <div>
                <NavBar mode="dark" >{navList.find(v=>v.path === pathname).title}</NavBar>
                <div>内容</div>
                <NavFooter data={navList}/>
            </div>
        )
    }
}
export default Dashboard;