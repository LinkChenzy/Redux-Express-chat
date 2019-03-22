import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { LOAD_FN } from 'reduxs/user_redux'

@withRouter
@connect(
    null,
    { LOAD_FN }
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const pathname = this.props.location.pathname;
        const matchUrl = ['/login','/register'];
        if(matchUrl.indexOf(pathname) > -1){
            return null
        }
        Axios.get('/api/user/info').then(res=>{
            if(res.status === 200 && res.data.code === 0){
                this.props.LOAD_FN(res.data.list);
            }else{
                this.props.history.push('/login');
            }
            // 用户为登录
            // 用户未完善个人信息 用户的类型bossh genius
        })
    }
    render(){
        return (<div></div>)
    }
}
export default AuthRoute;