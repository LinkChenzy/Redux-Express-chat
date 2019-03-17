import React, { Component } from 'react'
import Axios from 'axios';

export default class Home extends Component {
    componentDidMount = () => {
        Axios({
            method: 'get',
            url: '/userlist'
        }).then(res => {
            console.log('res', res)
        })
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
