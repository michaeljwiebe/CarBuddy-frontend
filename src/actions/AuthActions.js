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
	LOGOUT_USER,
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

export const logoutUser = () => {
	return{
		type: LOGOUT_USER
	}
}

export const createUser = ({ email, password, name, address, zip }) => {
	return(dispatch => {
		dispatch({ type: CREATE_USER })
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				//store email, displayName, photoURL in default User data, store other props in Realtime database
				user.updateProfile({
					displayName: name
				})
				.then(() => console.log('displayName update complete ', name))
				.catch(() => console.log('displayName update failed'))
				firebase.database().ref(`users/${user.uid}`)
				.set({
					address,
					zip
				})
				.then(() => console.log('successful address zip update'))
				.catch(() => console.log('failed address zip update'))
				loginUserSuccess(dispatch, user)
			})
			.catch(() => loginUserFailure(dispatch))
	})
}
export const updateUser = ({ email, password, name, address, zip }) => {
	return( dispatch => {
		console.log('updateUser action', email, password, name, address, zip)
		let currentUser = firebase.auth().currentUser;
		dispatch({ type: UPDATE_USER, payload: { email, password, name, address, zip } })
		currentUser.updateProfile({
			displayName: name
		})
			.then(() => console.log('successful name update'))
			.catch(()=> console.log('failed name update'))
		firebase.database().ref(`users/${currentUser.uid}`)
			.set({
				address,
				zip
			})
			.then(() => console.log('successful address zip update'))
			.catch(() => console.log('failed address zip update'))
		currentUser.updateEmail(email)
			.then(()=> console.log('successful email update'))
			.catch(()=> console.log('failed email update'))
		currentUser.updatePassword(password)
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