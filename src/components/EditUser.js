import React, { Component } from "react";
import { connect } from 'react-redux';

import FormUser from './FormUser';
import { 	
	updateUser, 
	nameChanged, 
	addressChanged, 
	zipChanged, 
	emailChanged,
	passwordChanged  
} from '../actions';

class EditUser extends Component {
	render() {
		console.log('editUser props', this.props);
		//actions
		const { 
			deleteUser 
		} = this.props;

		return (
			<div>
				<FormUser {...this.props}/>
				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input
						className="btn input"
						type="file"
						name="picture"
						defaultValue="fileName"
					/>
				</form>
				<div>
					<div>{ this.props.error }</div>
					<div className="btn" onClick={ this.updateUserInfo.bind(this) }>Update</div>
					<div className="btn" onClick={ deleteUser }>Delete My Account</div>
				</div>
			</div>
		);
	}

	componentWillMount(){
		const {
			nameChanged, 
			addressChanged, 
			zipChanged, 
			emailChanged,
			passwordChanged 
		} = this.props;
		// console.log('editUser props', this.props)
		const { email, password, address, zip } = this.props;
		const displayName = this.props.user.displayName;
		nameChanged(displayName);
		addressChanged(address);
		zipChanged(zip);
		emailChanged(email);
		passwordChanged(password);
	}

	updateUserInfo() {
		//redux state
		const { 
			name, 
			email, 
			password, 
			address, 
			zip 
		} = this.props;
		this.props.updateUser({ name, email, password, address, zip });
		this.props.resetState();
		// TODO: route to cars page after update, currently managed in App state
	}
}

const mapStateToProps = ({ auth }) => {
	// console.log('auth', auth);
	const { email, password, name, error } = auth;
	const { address, zip } = auth.user;
	return { email, password, name, address, zip, error };
}

export default connect(mapStateToProps,{ 
	updateUser, 
	nameChanged, 
	addressChanged, 
	zipChanged, 
	passwordChanged, 
	emailChanged
})(EditUser);
