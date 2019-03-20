import React                from 'react';
import Home                 from "containers/home";
import { createStore,applyMiddleware,compose }      from 'redux';
import { Provider }         from 'react-redux';
import thunk                from 'redux-thunk';
import reducers 		 	from "./reduce";
import {
	BrowserRouter, Route, Switch
} from 'react-router-dom'
import Auth 								from "containers/auth";


const reduxTool = window.devToolsExtension ? window.devToolsExtension() : f=>f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxTool
));

function Nomatch(){
	return <h1>404</h1>
}
console.log('store.getState()', store.getState())
function App(props){
    return (
    (<Provider store={store}>
		<BrowserRouter>
			<div className="App" >
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/auth' component={Auth} />
					{/* 报错404页面 */}
					<Route path="/:location" component={Nomatch} /> 
				</Switch>
			</div>
		</BrowserRouter>
    </Provider>)
      
    );
}
store.subscribe(App)
export default App;
