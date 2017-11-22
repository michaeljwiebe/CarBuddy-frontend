import firebase from 'firebase';
import {
	CAR_CREATED,
	CAR_YEAR_CHANGED,
	CAR_MAKE_MODEL_CHANGED,
	CAR_PRICE_CHANGED
}

export const carCreated = ( makeModel, year, price) => {
	return(dispatch) => {
		const { currentUser } = firebase.auth();
		firebase.database().ref(`users/${currentUser.uid}/cars`)
			.push({ makeModel, year, price })
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