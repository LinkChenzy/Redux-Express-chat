import React, { Component } from 'react'

export default class Demo extends Component {
    state={
        title:'标题',num:0
    }
    handleTitle=()=>{
        this.setState({
            title:this.state.title+'!'
        })
    }
    handleNum=()=>{
        this.setState({
            num:this.state.num+1
        })
    }
  render() {
    return (
      <div>
          <h1>这是demo  {this.state.num}</h1>
          <button onClick={this.handleNum}>增加数字</button>
          <button onClick={this.handleTitle}>切换title</button>
          <ChildClass title={this.state.title}/>
      </div>
    )
  }
}

class ChildClass extends React.PureComponent{
    render(){
        return(
            <div>
                <h1>This is a {this.props.title}</h1>
            </div>
        )
    }
}
