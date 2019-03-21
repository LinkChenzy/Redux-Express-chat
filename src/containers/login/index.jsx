import React, { Component } from 'react'
import Logo from "components/logo";
import { InputItem,List,WingBlank,WhiteSpace,Button } from 'antd-mobile'

export default class Login extends Component {
	register= ()=>{
        console.log(this.props)
        this.props.history.push('/register')
    }
	render() {
		return (
			<div>
				<Logo />
				<h3>Login</h3>
				<List>
					<InputItem
						clear
						placeholder="username"
					>Username</InputItem>
					<WhiteSpace />
					<InputItem
						clear
						type="password"
						placeholder="******"
					>Password</InputItem>
				</List>
				<WhiteSpace />
                <WingBlank>
                    <Button type="primary">LOGIN</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>REGISRE</Button>
                </WingBlank>
			</div>
		)
	}
}
