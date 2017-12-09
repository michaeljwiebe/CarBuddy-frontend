import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	nameChanged, 
	addressChanged, 
	zipChanged, 
	emailChanged,
	passwordChanged  
} from '../actions';

class FormUser extends Component{
	render(){
		const { displayName, address, zip, email, password } = this.props;
		const {
			nameChanged, 
			addressChanged, 
			zipChanged, 
			emailChanged, 
			passwordChanged 
		} = this.props;
		console.log('formuser', displayName, address, zip, email, password);
		return(
			<div className="inputs-container inputs-sign-up">
				<input
					onChange={event => nameChanged(event.target.value)}
					placeholder="name (required)"
					className="input"
					type="text"
					value={ displayName }
					required
				/>
				<input
					onChange={event => addressChanged(event.target.value)}
					placeholder="address"
					className="input"
					type="text"
					value={ address }
				/>
				<input
					onChange={event => zipChanged(event.target.value)}
					placeholder="zip"
					className="input"
					type="integer"
					value={ zip }
				/>
				<input
					onChange={event => emailChanged(event.target.value)}
					placeholder="email (required)"
					className="input"
					type="text"
					required
					value={ email }
				/>
				<input
					onChange={event => passwordChanged(event.target.value)}
					placeholder="password (required)"
					className="input"
					type="password"
					value={ password }
					required
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	//TODO how to access address from here? saved in db, not getting to frontend
	//zip is getting through, address not
	const { address, zip, email, password } = state.auth;
	console.log('state.auth',state.auth);
	const displayName = state.auth.name;
	return { displayName, address, zip, email, password };
}

export default connect(mapStateToProps, {
	nameChanged, 
	addressChanged, 
	zipChanged, 
	emailChanged,
	passwordChanged  
})(FormUser);