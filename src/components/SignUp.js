import React, { Component } from "react";
import { connect } from 'react-redux';

import FormUser from './FormUser';
import { createUser } from '../actions';


class SignUp extends Component {
	render() {
		return (
			<div>
				<FormUser />
				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input className="btn" type="file" name="picture" defaultValue="fileName" />
				</form>
				<div>{ this.props.error }</div>
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

export default connect(mapStateToProps, { createUser })(SignUp);
