import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from "reduxs/auth_redux";
import { Redirect } from "react-router-dom";

@connect(
    // state => ({ Auth:state.Auth}),
    state => state.Auth,    
    { login }
)
class Auth extends Component {
  render() {
    console.log(this.props)
    return (
        <div>
            {this.props.isAuth?<Redirect to='/' /> : null}
            <h1>需要登录才能访问</h1>  
            <button onClick={this.props.login}>登录</button>  
        </div>
    )
  }
}
export default Auth;