import React, { Component } from "react";
import { connect } from 'react-redux';
import { 	
	updateUser, 
	nameChanged, 
	addressChanged, 
	zipChanged, 
	emailChanged,
	passwordChanged  
} from '../actions';

class EditUser extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		username: props.user.username,
	// 		password: props.user.password,
	// 		name: props.user.name,
	// 		address: props.user.address,
	// 		zip: props.user.zip
	// 	};
	// 	this.updateUsername = this.updateUsername.bind(this);
	// 	this.updatePassword = this.updatePassword.bind(this);
	// 	this.updateName = this.updateName.bind(this);
	// 	this.updateAddress = this.updateAddress.bind(this);
	// 	this.updateZip = this.updateZip.bind(this);
	// 	this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
	// 	this.handleDeleteUser = this.handleDeleteUser.bind(this);
	// }
	render() {
		//actions
		const { 
			nameChanged, 
			addressChanged, 
			zipChanged, 
			emailChanged, 
			passwordChanged, 
			updateUser, 
			deleteUser 
		} = this.props;

		//redux state
		const { 
			name, 
			email, 
			password, 
			address, 
			zip 
		} = this.props;
		console.log('name', name);
		console.log('email', email);
		console.log('password', password);
		console.log('address', address);
		console.log('zip', zip);

		//from firebase datastore
		const nameDb = this.props.user.displayName;

		return (
			<div className="inputs-container">
				<input
					className="input"
					type="text"
					onChange={ event => emailChanged(event.target.value) }
					value={ email }
					placeholder="Email address"
				/>
				<input
					className="input"
					type="text"
					onChange={ event => passwordChanged(event.target.value) }
					value={ password }
					placeholder="Password"
				/>
				<input
					className="input"
					type="text"
					onChange={ event => nameChanged(event.target.value) }
					value={ nameDb }
					placeholder="Name"
				/>
				<input
					className="input"
					type="text"
					onChange={ event => addressChanged(event.target.value) }
					value={ address }
					placeholder="Address"
				/>
				<input
					className="input"
					type="text"
					onChange={ event => zipChanged(event.target.value) }
					value={ zip }
					placeholder="ZIP code"
				/>
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
					<div className="btn" onClick={ this.updateUserInfo.bind(this) }>Update</div>
					<div className="btn" onClick={ deleteUser }>Delete My Account</div>
				</div>
			</div>
		);
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
		this.props.updateUser({name, email, password, address, zip});
	}

	// handleDeleteUser() {
	// 	this.props.deleteUser();
	// }

	// updateUsername(event) {
	// 	this.setState({ username: event.target.value });
	// }

	// updatePassword(event) {
	// 	this.setState({ password: event.target.value });
	// }

	// updateName(event) {
	// 	this.setState({ name: event.target.value });
	// }

	// updateAddress(event) {
	// 	this.setState({ address: event.target.value });
	// }

	// updateZip(event) {
	// 	this.setState({ zip: event.target.value });
	// }
}

const mapStateToProps = ({ auth }) => {
	const { email, password, name, address, zip } = auth;
	return { email, password, name, address, zip };
}

export default connect(mapStateToProps,{ 
	updateUser, 
	nameChanged, 
	addressChanged, 
	zipChanged, 
	passwordChanged, 
	emailChanged
})(EditUser);
