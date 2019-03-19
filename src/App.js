import React, { Component } from 'react';
import Home                 from "containers/home";
import { createStore }      from 'redux';
import {demo_reducer,add,remove}         from 'reduxs/demo'
import './App.css';


const store = createStore(demo_reducer);

class App extends Component {
  render() {
    return (
      <div className="App" >
          <Home store={store} add={add} remove={remove}/>
      </div>
    );
  }
}

export default App;
