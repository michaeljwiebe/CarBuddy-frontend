import React, { Component } from "react";
import { connect } from 'react-redux';
import { 	
	createUser, 
	nameChanged, 
	addressChanged, 
	zipChanged, 
	emailChanged,
	passwordChanged  
} from '../actions';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			address: null,
			zip: null,
			username: null,
			password: null
		};
		// this.updateName = this.updateName.bind(this);
		// this.updateAddress = this.updateAddress.bind(this);
		// this.updateZip = this.updateZip.bind(this);
		// this.updateUsername = this.updateUsername.bind(this);
		// this.updatePassword = this.updatePassword.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
	}
	render() {
		return (
			<div className="inputs-container inputs-sign-up">
				<input
					className="input"
					type="text"
					onChange={event => this.props.nameChanged(event.target.value)}
					placeholder="name (required)"
					required
				/>
				<input
					className="input"
					type="text"
					onChange={event => this.props.addressChanged(event.target.value)}
					placeholder="address"
				/>
				<input
					className="input"
					type="integer"
					onChange={event => this.props.zipChanged(event.target.value)}
					placeholder="zip"
				/>
				<input
					className="input"
					type="text"
					onChange={event => this.props.emailChanged(event.target.value)}
					placeholder="email (required)"
					required
				/>
				<input
					className="input"
					type="text"
					onChange={event => this.props.passwordChanged(event.target.value)}
					placeholder="password (required)"
					required
				/>
				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input className="btn" type="file" name="picture" defaultValue="fileName" />
				</form>
				<div className="btn btn-sign-up" onClick={this.handleCreateUser}>Sign Up!</div>
			</div>
		);
	}

	handleCreateUser() {
		const { email, password, name, address, zip } = this.props
		this.props.createUser({ email, password });
	}

	// updateName(event) {
	// 	this.setState({ name: event.target.value });
	// }

	// updateAddress(event) {
	// 	this.setState({ address: event.target.value });
	// }

	// updateZip(event) {
	// 	this.setState({ zip: event.target.value });
	// }

	// updateUsername(event) {
	// 	this.setState({ username: event.target.value });
	// }

	// updatePassword(event) {
	// 	this.setState({ password: event.target.value });
	// }
}
const mapStateToProps = (props) => {
	const { email, password, address, zip, name, error } = props.auth
	return { email, password, address, zip, name, error };
}

export default connect(mapStateToProps, { 
	createUser, 
	nameChanged, 
	addressChanged, 
	zipChanged, 
	emailChanged,
	passwordChanged 
})(SignUp);
