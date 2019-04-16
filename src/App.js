import React                from 'react';
import { Route, Switch,Redirect } 	from 'react-router-dom'
// import Auth 								from "containers/auth";
// import Home 								from "containers/home";
import Login 							from "containers/login";
import Register 						from "containers/register";
import AuthRoute 						from 'components/auth';
import BossInfo 						from "containers/owninfo/boss";
import Chat								from "containers/chat";
import GeniusInfo 						from 'containers/owninfo/genius';
import Dashboard 						from 'components/dashboard';
import Demo 							from 'containers/demo';
import './axios/config';

function Nomatch(){
	return <h1>404</h1>
}

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}
	logComponentStackToMyService(info){
		if(info){
			this.setState({
				hasError:true
			})
		}
	}
	componentDidCatch(error, info) {
		console.log('error', error)
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		console.log('info.componentStack', info)
		this.logComponentStackToMyService(info.componentStack);
	}
	render(){
		return this.state.hasError ? <Redirect to='/login' />:(
			<div className="App" >
				<AuthRoute></AuthRoute>
				<Switch>
					{/* <Route path='/' exact component={Home} /> */}
					{/* <Route path='/auth' component={Auth} /> */}
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
		);
	}
}
export default App;
