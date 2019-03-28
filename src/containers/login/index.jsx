import React, { Component } from 'react'
import Logo from "components/logo";
import { InputItem,List,WingBlank,WhiteSpace,Button,Toast } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from 'reduxs/user_redux';
import Formhoc from 'components/form_HOC'
 

@connect(
    state=>state.userRedux,
    { login }
)
@Formhoc
class Login extends Component {
	// 注册提交按钮
    handleLogin= ()=>{
        const { user,password } = this.props.state;
        if(!user || !password ){
            return Toast.fail('用户名密码不能为空！')
        }else{
            this.props.login(this.props.state)
        }
    }
	register= ()=>{
		console.log(this.props)
        this.props.history.push('/register')
	}
	render() {
		let { redirectTo } = this.props;
		return (
			<div>
				{ (redirectTo && redirectTo!=='/login') ? <Redirect to={ redirectTo } />:null }
				<Logo />
				<h3>Login</h3>
				<List>
					<InputItem clear placeholder="username" 
                        onChange={v=>this.props.handValue('user',v)}
                    >Username</InputItem>
					<WhiteSpace />
                    <InputItem clear type="password" placeholder="******" 
                        onChange={v=>this.props.handValue('password',v)}
                    >Password</InputItem>
				</List>
				<WhiteSpace />
                <WingBlank>
                    <Button type="primary" onClick={this.handleLogin}>LOGIN</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>REGISRE</Button>
                </WingBlank>
			</div>
		)
	}
}
export default Login;
