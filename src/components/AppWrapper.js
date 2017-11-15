import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';

import reducers from '../reducers';
import Router from './Router';
import App from './App';

class AppWrapper extends Component {
	componentWillMount(){
		const config = {
	    apiKey: "AIzaSyBNu6c40-DgHsV8z4pnmNjfbf78JkoN-Lg",
	    authDomain: "carbuddy-f6a6d.firebaseapp.com",
	    databaseURL: "https://carbuddy-f6a6d.firebaseio.com",
	    projectId: "carbuddy-f6a6d",
	    storageBucket: "",
	    messagingSenderId: "256868223964"
	  };
	  firebase.initializeApp(config);
	}

	render(){
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		)
	}
}

export default AppWrapper;