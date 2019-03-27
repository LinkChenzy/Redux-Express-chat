import React, { Component } from 'react';
import PropTypes            from 'prop-types'
import { TabBar }           from 'antd-mobile';
import { withRouter }       from 'react-router-dom';

@withRouter
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
        return (
            <div>
                <TabBar>
                    {
                        navList.map(v=>{
                            return (
                                <TabBar.Item
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