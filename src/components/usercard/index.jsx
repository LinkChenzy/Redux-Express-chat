import React, { Component } from 'react';
import { Card,WhiteSpace,WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
    onChangeChat=(v)=>{
        this.props.history.push(`/chat/${v.id}`)
    }
    render() {
        const data = this.props.userList;
        return (
            <WingBlank size="lg">
                {data.map((v,i)=>{
                    return (
                        v.avatar ? 
                        <div className="genius-card" key={i}>
                            <WhiteSpace size="lg" />
                            <Card key={v.id} onClick={()=>this.onChangeChat(v)}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                />
                                <Card.Body>
                                    { v.desc && v.desc.split('\n').map(v=>{
                                        return <div key={v}>{v}</div>
                                    })}
                                </Card.Body>
                                {v.company && <Card.Footer content={v.company} extra={<div>薪资：{v.money}</div>} />}
                            </Card>
                        </div> : <div>暂无数据</div>
                    )
                })}
                <WhiteSpace size="lg" />
            </WingBlank>
        )
    }
}

export default UserCard;