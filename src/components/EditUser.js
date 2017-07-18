import React, { Component } from "react";

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.user.username,
			password: props.user.password,
			name: props.user.name,
			address: props.user.address,
			zip: props.user.zip
		};
		this.updateUsername = this.updateUsername.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updateAddress = this.updateAddress.bind(this);
		this.updateZip = this.updateZip.bind(this);
		this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
	}
	render() {
		console.log(this.state);
		return (
			<div className="inputs-container">
				<input
					className="input"
					type="text"
					onChange={this.updateUsername}
					value={this.state.username}
					placeholder="Username"
				/>
				<input
					className="input"
					type="text"
					onChange={this.updatePassword}
					value={this.state.password}
					placeholder="Password"
				/>
				<input
					className="input"
					type="text"
					onChange={this.updateName}
					value={this.state.name}
					placeholder="Name"
				/>
				<input
					className="input"
					type="text"
					onChange={this.updateAddress}
					value={this.state.address}
					placeholder="Address"
				/>
				<input
					className="input"
					type="text"
					onChange={this.updateZip}
					value={this.state.zip}
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
					<div className="btn" onClick={this.handleUpdateUserInfo}>Update</div>
					<div className="btn" onClick={this.handleDeleteUser}>Delete My Account</div>
				</div>
			</div>
		);
	}

	handleUpdateUserInfo() {
		this.props.updateUserInfo(this.state);
	}

	handleDeleteUser() {
		this.props.deleteUser();
	}

	updateUsername(event) {
		this.setState({ username: event.target.value });
	}

	updatePassword(event) {
		this.setState({ password: event.target.value });
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
}

export default EditUser;
