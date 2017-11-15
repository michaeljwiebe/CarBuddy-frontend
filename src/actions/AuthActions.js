import firebase from 'firebase';
// import Router from 'react-router-flux'
import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED, 
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAILURE, 
	LOGIN_USER 
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

export const loginUser = ({ email, password }) => {
	return(dispatch) => {
		dispatch({ type: LOGIN_USER })

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user))
		.catch((error) => {
			console.log(error);
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFailure(dispatch))
		})
	}
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