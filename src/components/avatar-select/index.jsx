import React, { Component } from 'react';
import PropsTypes           from 'prop-types';
import { Grid,List }        from 'antd-mobile';

export default class AvatarSelect extends Component {
    state={}
	render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',')
												.map(v=>({
													icon:require(`../img/${v}.png`),
													text:v
                                                }));
        const ListHeader = this.state.icon?
                            (<div><span>已选择头像</span><img src={this.state.icon} alt={this.state.text} /></div>):'请选择头像';
		return (
			<div>
                <List renderHeader={() => ListHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    >
                    </Grid>
                </List>
			</div>
		)
	}
}
// 规定父组件传给子组件的函数的类型 PropsTypes
AvatarSelect.propTypes = {
    selectAvatar:PropsTypes.func.isRequired
}
