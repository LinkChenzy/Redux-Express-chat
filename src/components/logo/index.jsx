import React, { Component } from 'react'
import logoUrl from './logo.svg';
import './logo.css'
export default class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
          <img src={logoUrl} alt=""/>
      </div>
    )
  }
}
