import React, { Component } from "react";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};

		this.updateUsername = this.updateUsername.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);
	}
	render() {
		return (
			<div className="input-container sign-in">
				<input className="input" onChange={this.updateUsername} placeholder="username" />
				<input
					className="input"
					type="password"
					onChange={this.updatePassword}
					placeholder="password"
				/>
				<div className="btn btn-sign-in" onClick={this.handleSignIn}>Sign In</div>
			</div>
		);
	}

	updateUsername(event) {
		this.setState({ username: event.target.value });
	}

	updatePassword(event) {
		this.setState({ password: event.target.value });
	}

	handleSignIn() {
		this.props.signIn(this.state);
	}
}

export default SignIn;
