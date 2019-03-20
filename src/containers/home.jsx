import React, { Component } from 'react'
import { connect }          from 'react-redux';
import { add,remove}        from "reduxs/demo";
import { logout, getUserData }  from "reduxs/auth_redux";
import { Redirect }         from "react-router-dom";

@connect(
    state => ({ initData: state.demo_reducer,auth:state.Auth}),
    // state => state.Auth,
    { add, remove, logout, getUserData}
)
class Home extends Component {
    componentDidMount(){
        this.props.getUserData();
    }
    render() {
        console.log('this.props', this.props)
        const initData = this.props.initData;
        const add = this.props.add;
        const remove = this.props.remove;
        const couterApp = (
            <div>
                <h1>{initData}</h1>
                <button onClick={() => add()}>+</button>
                <button onClick={() => remove()}>-</button>
                <button onClick={this.props.logout}>退出登录</button>
            </div>
        );
        const goLogin = (<Redirect to='/auth' />)
        return (this.props.auth.isAuth ? couterApp : goLogin)
    }
}

export default Home