import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import { add,remove} from "reduxs/demo";

// const mapStatetoProps = (state)=>{
//     return {initData:state}
// } 
// const actionCreators = {add,remove};
// Home = connect(mapStatetoProps,actionCreators)(Home);
@connect(
    state=>({initData:state}),
    {add,remove}
)
class Home extends Component {
    componentDidMount = () => {
        // const p = Promise.resolve(this.getList);
        // p.then(res=>{console.log('res', res)});
        // Promise.resolve().then(this.getList)
        // console.log('1111', 1111)
        const p1 = new Promise((res,rej)=>{
            // reject('错误')
            res('sss')
        })
        const p2 = new Promise((res, rej) => {
            // reject('错误')
            res('aaaa')
        })
        Promise.all([this.getList,this.getData,p1,p2]).then(([res,data,p1,p2])=>{
            console.log('p1', p1)
            console.log('p2', p2)
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
    getData=()=>{
        Axios({
            method:'get',
            url:'/data'
        }).then(res=>{
            return res;
            // console.log('res', res)
        })
    }
    render() {
        const initData = this.props.initData;
        const add = this.props.add;
        const remove = this.props.remove;
        console.log(initData)
        return (
            <div>
                <h1>{initData}</h1>
                <button onClick={add}>+</button>
                <button onClick={remove}>-</button>
            </div>
        )
    }
}
export default Home