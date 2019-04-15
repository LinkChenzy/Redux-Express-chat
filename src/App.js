import React                from 'react';
import { createStore,applyMiddleware,compose }      from 'redux';
import { Provider }         from 'react-redux';
import thunk                from 'redux-thunk';
import reducers 		 				from "./reduce";
import {
	BrowserRouter, Route, Switch
} from 'react-router-dom'
import Auth 								from "containers/auth";
import Home 								from "containers/home";
import Login 								from "containers/login";
import Register 						from "containers/register";
import AuthRoute 						from 'components/auth';
import BossInfo 						from "containers/owninfo/boss";
import Chat									from "containers/chat";
import GeniusInfo 					from 'containers/owninfo/genius';
import Dashboard 						from 'components/dashboard';
import Demo 								from 'containers/demo';
import './axios/config';


const reduxTool = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxTool
));

function Nomatch(){
	return <h1>404</h1>
}

function App(props){
    return (
    (<Provider store={store}>
		<BrowserRouter>
			<div className="App" >
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/auth' component={Auth} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/bossinfo' component={BossInfo} />
					<Route path='/geniusinfo' component={GeniusInfo} />
					<Route path='/chat/:user' component={Chat} />
					<Route path='/demo' component={ Demo } />
					{/* 4个页面：boss,genius,msg,home */}
					<Route component={ Dashboard } />
					{/* 报错404页面 */}
					<Route path="/:location" component={Nomatch} /> 
				</Switch>
			</div>
		</BrowserRouter>
    </Provider>)
      
    );
}
export default App;
