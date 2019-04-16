import React, { Component } from 'react'
import './logo.css'
export default class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
          <img src={require('./logo.svg')} alt=""/>
      </div>
    )
  }
}
