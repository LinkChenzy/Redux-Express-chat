import React, { Component } from 'react';
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import { TabBar }           from 'antd-mobile';
import { withRouter }       from 'react-router-dom';

@withRouter
@connect(
    state => state.chatRedux
)
class NavFooter extends Component {
    constructor(props){
        super(props)
        this.state={
            // navList:this.props.data.filter(v=>!v.hide)
        }
    }
    render() {
        const navList       = this.props.data.filter(v=>!v.hide);
        const { pathname }  = this.props.location;
        const badge = this.props.unread;
        return (
            <div>
                <TabBar>
                    {
                        navList.map(v=>{
                            return (
                                <TabBar.Item
                                    badge={v.path === '/msg'?badge:0}
                                    title={v.text}
                                    key={v.text}
                                    icon={{uri:require(`./img/${v.icon}.png`)}}
                                    selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                                    selected={pathname === v.path}
                                    onPress={()=>{
                                        this.props.history.push(v.path)
                                    }}
                                >
                                </TabBar.Item>
                            )
                        })
                    }
                    
                </TabBar>
            </div>
        )
    }
}
// 规定父组件传给子组件的函数的类型 PropTypes
NavFooter.propTypes = {
    data: PropTypes.array.isRequired
}
export default NavFooter;