import React, { Component } from 'react'
import Logo from "components/logo";
import { InputItem,List,WingBlank,WhiteSpace,Button,Toast } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from 'reduxs/user_redux';
 
@connect(
    state=>state.userRedux,
    { login }
)
class Login extends Component {
	constructor(props){
		super(props)
		this.state={
		}
	}
	// 注册提交按钮
    handleLogin= ()=>{
        const { user,password } = this.state;
        if(!user || !password ){
            return Toast.fail('用户名密码不能为空！')
        }else{
            this.props.login(this.state)
        }
    }
	register= ()=>{
        this.props.history.push('/register')
	}
	handValue = (key,v)=>{
        this.setState({ [key]:v });
    }
	render() {
		let { redirectTo } = this.props;
		return (
			<div>
				{ redirectTo ? <Redirect to={ redirectTo } />:null }
				<Logo />
				<h3>Login</h3>
				<List>
					<InputItem clear placeholder="username" 
                        onChange={v=>this.handValue('user',v)}
                    >Username</InputItem>
					<WhiteSpace />
                    <InputItem clear type="password" placeholder="******" 
                        onChange={v=>this.handValue('password',v)}
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
