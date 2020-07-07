import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cadastrar from './pages/Cadastrar';
import Login from './pages/Login';
import rootReducers from './reducers';

const store = createStore(rootReducers);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Route exact path='/' component={Home} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/cadastrar' component={Cadastrar} />
				<Route exact path='/login' component={Login} />
			</App>
		</Router>
	</Provider>,
	document.getElementById('root')
);
