import React, { Component } from "react";

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
		this.updateName = this.updateName.bind(this);
		this.updateAddress = this.updateAddress.bind(this);
		this.updateZip = this.updateZip.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
	}
	render() {
		return (
			<div className="inputs-container inputs-sign-up">
				<input
					className="input"
					type="text"
					onChange={this.updateName}
					placeholder="name (required)"
					required
				/>
				<input
					className="input"
					type="text"
					onChange={this.updateAddress}
					placeholder="address"
				/>
				<input
					className="input"
					type="integer"
					onChange={this.updateZip}
					placeholder="zip"
				/>
				<input
					className="input"
					type="text"
					onChange={this.updateUsername}
					placeholder="username (required)"
					required
				/>
				<input
					className="input"
					type="text"
					onChange={this.updatePassword}
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
		this.props.createUser(this.state);
	}

	updateName(event) {
		this.setState({ name: event.target.value });
	}

	updateAddress(event) {
		this.setState({ address: event.target.value });
	}

	updateZip(event) {
		this.setState({ zip: event.target.value });
	}

	updateUsername(event) {
		this.setState({ username: event.target.value });
	}

	updatePassword(event) {
		this.setState({ password: event.target.value });
	}
}

export default SignUp;
