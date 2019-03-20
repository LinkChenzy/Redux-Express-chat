import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import { add,remove} from "reduxs/demo";
import { logout } from "reduxs/auth_redux";
import { Redirect } from "react-router-dom";
// const mapStatetoProps = (state)=>{
//     return {initData:state}
// } 
// const actionCreators = {add,remove};
// Home = connect(mapStatetoProps,actionCreators)(Home);
@connect(
    state => ({ initData: state.demo_reducer,Auth:state.Auth}),
    { add, remove, logout}
)
class Home extends Component {
    componentDidMount = () => {
        const p1 = new Promise((res,rej)=>{
            res('sss')
        })
        const p2 = new Promise((res, rej) => {
            res('aaaa')
        })
        Promise.all([this.getList,p1,p2]).then(([res,p1,p2])=>{
            // console.log('p1', p1)
            // console.log('p2', p2)
        }).catch(err=>{
            console.log('err', err)
        })
    }
    getList=()=>{
        Axios({
            method: 'get',
            url: '/userlist'
        }).then(res => {
            res(res)
            // return res
            // reject('出错了')
            console.log('res', res)
        })
    }
    render() {
        const initData = this.props.initData;
        const add = this.props.add;
        const remove = this.props.remove;
        const addData = {name:"add"},removeData = {name:"remove"}
        const couterApp = (
            <div>
                <h1>{initData}</h1>
                <button onClick={() => add(addData)}>+</button>
                <button onClick={() => remove(removeData)}>-</button>
                <button onClick={this.props.logout}>退出登录</button>
            </div>
        );
        const goLogin = (<Redirect to='/auth' />)
        return (
            this.props.Auth.isAuth ? couterApp:goLogin
        )
    }
}
export default Home