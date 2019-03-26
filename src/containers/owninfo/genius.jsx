import React, { Component } 					from 'react';
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelect 							from 'components/avatar-select';
import { Redirect } 							from 'react-router-dom';
import { connect } 								from 'react-redux';
import { infoUpdate } 							from 'reduxs/user_redux'

@connect(
	state => state.userRedux,
	{ infoUpdate }
)
class GeniusInfo extends Component {
	state = {
		title:'',desc:''
	}
	// 选择头像
	selectAvatar = (avatar) => {
		this.setState({ avatar })
	}
	// 表单的数据
	handValue = (key, v) => {
		this.setState({ [key]: v });
	}
	render() {
		const redirectTo = this.props.redirectTo;
		const path = this.props.location.pathname;
		return (
			<div>
				{redirectTo && redirectTo !== path ? <Redirect to={redirectTo} /> : null}
				<NavBar mode="dark" >牛人完善信息页面</NavBar>
				<AvatarSelect selectAvatar={(avatar) => this.selectAvatar(avatar)} />
				<InputItem clear
					onChange={v => this.handValue('title', v)}
				>求职岗位</InputItem>
				<TextareaItem
					onChange={(v) => { this.handValue('desc', v) }}
					rows={3}
					autoHeight
					title='个人简介'
				>
				</TextareaItem>
				<Button type='primary' onClick={() => {
					this.props.infoUpdate(this.state)
				}}>保存</Button>
			</div>
		)
	}
}
export default GeniusInfo;