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
	render() {
		const { nameChanged, addressChanged, zipChanged, emailChanged, passwordChanged } = this.props;
		return (
			<div className="inputs-container inputs-sign-up">
				<input
					onChange={event => nameChanged(event.target.value)}
					placeholder="name (required)"
					className="input"
					type="text"
					required
				/>
				<input
					onChange={event => addressChanged(event.target.value)}
					placeholder="address"
					className="input"
					type="text"
				/>
				<input
					onChange={event => zipChanged(event.target.value)}
					placeholder="zip"
					className="input"
					type="integer"
				/>
				<input
					onChange={event => emailChanged(event.target.value)}
					placeholder="email (required)"
					className="input"
					type="text"
					required
				/>
				<input
					onChange={event => passwordChanged(event.target.value)}
					placeholder="password  (required)"
					className="input"
					type="text"
					required
				/>
				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input className="btn" type="file" name="picture" defaultValue="fileName" />
				</form>
				<div className="btn btn-sign-up" onClick={this.handleCreateUser.bind(this)}>Sign Up!</div>
			</div>
		);
	}

	handleCreateUser() {
		const { email, password, name, address, zip } = this.props
		this.props.createUser({ email, password, name, address, zip });
	}

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
