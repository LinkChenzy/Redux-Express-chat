import React, { Component } from 'react'
import Logo from "components/logo";
import { InputItem,List,WingBlank,WhiteSpace,Button,Radio } from 'antd-mobile'

const RadioItem = Radio.RadioItem;
export default class Register extends Component {
    state = {
        userType:'Genius'
    }
    // 注册提交按钮
    handleRegister= ()=>{
        console.log(this.state)
        const { user,password,userType } = this.state;
        if(!user || !password ){
            console.log('用户名密码不能为空！')
        }else{
            // this.props.
        }
    }
    handValue = (key,v)=>{
        this.setState({ [key]:v });
    }
    // 切换选择角色
    handRadio = (type)=>{
        this.setState({ userType:type })
    }
    render() {
        const { userType } = this.state;
        const RadioConfig = [
            { value: 0, label: 'Genius' },
            { value: 1, label: 'Boss' },
        ];                  
        return (
            <div>
                <Logo />
                <h3>Register</h3>
                <List>
                    <InputItem clear placeholder="username" 
                        onChange={v=>this.handValue('user',v)}
                    >Username</InputItem>
					<WhiteSpace />
                    <InputItem clear type="password" placeholder="******" 
                        onChange={v=>this.handValue('password',v)}
                    >Password</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="password" placeholder="******" 
                        onChange={v=>this.handValue('confirmpwd',v)}
                    >Confirm</InputItem>
                    <WhiteSpace />
                    {RadioConfig.map(i => (
                        <RadioItem key={i.value} checked={userType === i.label} onChange={() => this.handRadio(i.label)}>
                            {i.label}
                        </RadioItem>
                    ))}
				</List>
				<WhiteSpace />
                <WingBlank>
                    <Button type="primary" onClick={this.handleRegister}>REGISTER</Button>
                </WingBlank>
            </div>
        )
    }
}
