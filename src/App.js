import React                from 'react';
import Home                 from "containers/home";
import { createStore,applyMiddleware,compose }      from 'redux';
import { Provider }         from 'react-redux';
import thunk                from 'redux-thunk';
import {demo_reducer} from "reduxs/demo";
import './App.css';


const reduxTool = window.devToolsExtension ? window.devToolsExtension() : f=>f;
const store = createStore(demo_reducer,compose(
    applyMiddleware(thunk),
    reduxTool
));

function App(props){
    return (
      (<Provider store={store}>
          <div className="App" >
              <Home />
          </div>
      </Provider>)
      
    );
}
store.subscribe(App)
export default App;
