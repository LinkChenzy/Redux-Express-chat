import React from 'react'

export default function Formhoc (Comp){
    class HocForm extends React.Component{
        constructor(props){
            super(props)
            this.state={
            }
        }
        // 切换选择角色
        handRadio = (type)=>{
            this.setState({ type })
        }
        handValue = (key,v)=>{
            this.setState({ [key]:v });
        }
        render(){
            return (
                <Comp handValue={this.handValue} handRadio={this.handRadio} state={this.state} {...this.props}></Comp>
            )
        }
    }
    return HocForm;
}