import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from "components/logo";
import { InputItem,List,WingBlank,WhiteSpace,Button,Radio,Toast } from 'antd-mobile'
import { connect } from 'react-redux';
import { register } from 'reduxs/user_redux';
import Formhoc from 'components/form_HOC'
 
const RadioItem = Radio.RadioItem;
@connect(
    state=>state.userRedux,
    { register }
)
@Formhoc
class Register extends Component {
    componentDidMount(){
        this.props.handValue('type','genius')
    }
    // 注册提交按钮
    handleRegister= ()=>{
        const { user,password,confirmpwd } = this.props.state;
        if(!user || !password ){
            return Toast.fail('用户名密码不能为空！')
        }else if(password !== confirmpwd ){
            return Toast.fail('两次输入密码不一致！')
        }else{
            this.props.register(this.props.state)
        }
    }
    
    login= ()=>{
        this.props.history.push('/login')
	}
    render() {
        const { type } = this.props.state;
        const { redirectTo } = this.props;
        const RadioConfig = [
            { value: 0, label: 'genius' },
            { value: 1, label: 'boss' },
        ];                  
        return (
            <div>
                { redirectTo ? <Redirect to={ redirectTo } />:null }
                <Logo />
                <h3>Register</h3>
                <List>
                    <InputItem clear placeholder="username" 
                        onChange={v=>this.props.handValue('user',v)}
                    >Username</InputItem>
					<WhiteSpace />
                    <InputItem clear type="password" placeholder="******" 
                        onChange={v=>this.props.handValue('password',v)}
                    >Password</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="password" placeholder="******" 
                        onChange={v=>this.props.handValue('confirmpwd',v)}
                    >Confirm</InputItem>
                    <WhiteSpace />
                    {RadioConfig.map(i => (
                        <RadioItem key={i.value} checked={type === i.label} onChange={() => this.props.handRadio(i.label)}>
                            {i.label}
                        </RadioItem>
                    ))}
				</List>
				<WhiteSpace />
                <WingBlank>
                    <Button type="primary" onClick={this.handleRegister}>REGISTER</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login}>BACK LOGIN</Button>
                </WingBlank>
            </div>
        )
    }
}
export default  Register;