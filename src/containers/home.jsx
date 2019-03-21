import React, { Component } from 'react'
import { connect }          from 'react-redux';
import { logout, getUserData }  from "reduxs/auth_redux";
import { Redirect }         from "react-router-dom";

@connect(
    state => ({ auth:state.Auth}),
    // state => state.Auth,
    { logout, getUserData}
)
class Home extends Component {
    componentDidMount(){
        this.props.getUserData();
    }
    render() {
        const couterApp = (
            <div>
                <button onClick={this.props.logout}>退出登录</button>
            </div>
        );
        const goLogin = (<Redirect to='/auth' />)
        return (this.props.auth.isAuth ? couterApp : goLogin)
    }
}

export default Home