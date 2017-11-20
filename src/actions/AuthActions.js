import firebase from 'firebase';
// import Router from 'react-router-flux'
import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED, 
	NAME_CHANGED, 
	ADDRESS_CHANGED, 
	ZIP_CHANGED, 
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAILURE, 
	LOGIN_USER,
	CREATE_USER,
	UPDATE_USER
} from './types';
//import Actions from 'react-native-router-flux';

export const emailChanged = (email) => {
	return{
		type: EMAIL_CHANGED,
		payload: email
	}
}

export const passwordChanged = (password) => {
	return{
		type: PASSWORD_CHANGED,
		payload: password
	}
}	

export const nameChanged = (name) => {
	return{
		type: NAME_CHANGED,
		payload: name
	}
}	

export const addressChanged = (address) => {
	return{
		type: ADDRESS_CHANGED,
		payload: address
	}
}	

export const zipChanged = (zip) => {
	return{
		type: ZIP_CHANGED,
		payload: zip
	}
}	

export const loginUser = ({ email, password }) => {
	return(dispatch) => {
		dispatch({ type: LOGIN_USER })

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user))
		.catch((error) => {
			console.log(error);
		})
	}
}

export const createUser = ({ email, password, name, address, zip }) => {
	return(dispatch => {
		dispatch({ type: CREATE_USER })
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				user.updateProfile({
					displayName: name
				})
				.then(() => console.log('displayName update complete ', name))
				.catch(() => console.log('displayName update failed'))
				loginUserSuccess(dispatch, user)
			})
			.catch(() => loginUserFailure(dispatch))
	})
}
export const updateUser = ({ email, password, name, address, zip }) => {
	return( dispatch => {
		dispatch({ type: UPDATE_USER, payload: { email, password, name, address, zip } })
		let user = firebase.auth().currentUser;
		user.updateProfile({
			displayName: name,
			email
		})
			.then(() => console.log('successful name and email update'))
			.catch(()=> console.log('failed name and email update'))
		user.updatePassword(password)
			.then(() => console.log('successful password update'))
			.catch(()=> console.log('failed password update'))
	})
}

export const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	})
}

export const loginUserFailure = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAILURE
	})
}