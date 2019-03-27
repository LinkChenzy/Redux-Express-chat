import React, { Component } from 'react';
import { connect }          from 'react-redux'
import { getUserList }      from 'reduxs/userlist_redux'
import UserCard             from 'components/usercard';

@connect(
    state=>state.userlistRedux,
    {getUserList}
)
class Boss extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.props.getUserList('genius');
    }
    render() {
        const data = this.props.userList;
        return <UserCard userList={ data } />
    }
}

export default Boss;