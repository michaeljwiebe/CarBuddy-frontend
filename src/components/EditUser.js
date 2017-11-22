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
	render() {
		//actions
		const { 
			nameChanged, 
			addressChanged, 
			zipChanged, 
			emailChanged, 
			passwordChanged,
			deleteUser 
		} = this.props;

		//redux state
		let { 
			email, 
			password, 
			address, 
			zip
		} = this.props;
		
		//from user object from firebase
		let name = this.props.user.displayName;

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
					placeholder= { name }
				/>
				<input
					className="input"
					type="text"
					onChange={ event => addressChanged(event.target.value) }
					value={ address }
					placeholder={ address || "Address" }
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
		this.props.updateUser({ name, email, password, address, zip });
		// TODO: route to cars page
	}
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
