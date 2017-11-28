import firebase from 'firebase';
import {
	CAR_CREATED,
	CAR_YEAR_CHANGED,
	CAR_MAKE_MODEL_CHANGED,
	CAR_PRICE_CHANGED,
	CAR_MILEAGE_CHANGED,
	CARS_FETCH_SUCCESS
} from './types';

export const carsFetch = () => {
	return(dispatch) => {
		firebase.database().ref(`cars`)
			.on('value', snapshot => {
				dispatch({ type: CARS_FETCH_SUCCESS, payload: snapshot.val() })
			})
	}
}

export const carCreated = ( makeModel, year, price) => {
	return(dispatch) => {
		const currentUserId = firebase.auth().currentUser.uid;
		firebase.database().ref(`cars`)
			.push({ 
				makeModel, 
				year, 
				price, 
				currentUserId 
			})
			.then(() => dispatch({type: CAR_CREATED}))
	}
}

export const carYearChanged = (number) => {
	return {
		type: CAR_YEAR_CHANGED,
		payload: number
	}
}
export const carMakeModelChanged = (text) => {
	return {
		type: CAR_MAKE_MODEL_CHANGED,
		payload: text
	}
}
export const carPriceChanged = (number) => {
	return {
		type: CAR_PRICE_CHANGED,
		payload: number
	}
}
export const carMileageChanged = (number) => {
	return {
		type: CAR_MILEAGE_CHANGED,
		payload: number
	}
}
