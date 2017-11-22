import React, { Component } from "react";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class SignIn extends Component {

	render() {
		console.log("signIn props", this.props)
		let errorMsg = <div>{this.props.error}</div>;

		return (
			<div className="input-container sign-in">
				<input 
					className="input" 
					onChange={ event => this.props.emailChanged(event.target.value)}
					placeholder="email@email.com" 
					value={this.props.email}
				/>
				<input
					className="input"
					type="password"
					onChange={ event => this.props.passwordChanged(event.target.value)}
					placeholder="password"
					value={this.props.password}
				/>
				{errorMsg}
				<div className="btn btn-sign-in" onClick={this.onSignIn.bind(this)}>Sign In</div>
			</div>
		);
	}

	// onEmailChange(event){
	// 	this.props.emailChanged(event.target.value)
	// }

	// onPasswordChange(event){
	// 	this.props.passwordChanged(event.target.value)
	// }
	onSignIn(){
		const { email, password } = this.props;
		this.props.loginUser({ email: email, password: password });
	}
}


const mapStateToProps = (props) => {
	const { email, password, error } = props.auth
	return { email, password, error };
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(SignIn);
