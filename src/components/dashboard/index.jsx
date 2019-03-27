import React, { Component } from 'react';
import { Switch,Route }     from 'react-router-dom';
import NavFooter            from 'components/navfooter'
import { NavBar }           from 'antd-mobile';
import { connect }          from 'react-redux';
import Boss                 from 'components/dash_content/boss';
import Genius               from 'components/dash_content/genius';
// import { Msg }              from 'components/dash_content/msg';
// import { User }             from 'components/dash_content/user';

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
                <div>
                    <Switch>
                        {navList.map(v=>{
                            return <Route key={v.path} path={v.path} component={v.component} />
                        })}
                    </Switch>
                </div>
                <NavFooter data={navList}/>
            </div>
        )
    }
}
export default Dashboard;