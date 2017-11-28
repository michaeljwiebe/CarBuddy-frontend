import firebase from 'firebase';
import { 
	REVIEW_TITLE_CHANGED, 
	REVIEW_DESCRIPTION_CHANGED, 
	REVIEW_RATING_CHANGED,
	REVIEW_CREATED,
	REVIEWS_FETCH_SUCCESS
} from './types';

export const reviewTitleChanged = (text) => {
	return{
		type: REVIEW_TITLE_CHANGED,
		payload: text
	}
}

export const reviewRatingChanged = (text) => {
	return{
		type: REVIEW_RATING_CHANGED,
		payload: text
	}
}

export const reviewDescriptionChanged = (text) => {
	return{
		type: REVIEW_DESCRIPTION_CHANGED,
		payload: text
	}
}

export const reviewCreated = (title, description, rating, car) => {
	return(dispatch) => {
		const { currentUser } = firebase.auth();
		firebase.database().ref(`users/${currentUser.uid}/reviews`)
			.push({ 
				title, 
				description, 
				rating, 
				currentUser: currentUser.uid 
			})
			// .then(() => Actions.employeeList({ type: 'reset' }))
		dispatch({type: REVIEW_CREATED})
	}
}

export const reviewsFetch = () => {
	return (dispatch) => {
		const { currentUser } = firebase.auth();
		firebase.database().ref(`users/${currentUser.uid}/reviews`)
			.on('value', snapshot => {
				dispatch({ type: REVIEWS_FETCH_SUCCESS, payload: snapshot.val() })
			})
	}
}
