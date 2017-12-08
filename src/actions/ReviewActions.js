import firebase from 'firebase';
import { 
	REVIEW_TITLE_CHANGED, 
	REVIEW_DESCRIPTION_CHANGED, 
	REVIEW_RATING_CHANGED,
	REVIEW_CREATED,
	REVIEW_DELETED,
	REVIEW_INITIALIZED,
	REVIEW_SAVE_CHANGES,
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

export const reviewCreated = ({title, description, rating, carId}) => {
	return(dispatch) => {
		const { currentUser } = firebase.auth();
		firebase.database().ref(`reviews`)
		.push({ 
			title, 
			description, 
			rating, 
			carId,
			userId: currentUser.uid,
			username: currentUser.displayName
		})
			// .then(() => Actions.employeeList({ type: 'reset' }))
		dispatch({ type: REVIEW_CREATED })
	}
}

export const reviewSaveChanges = (carId, description, rating, reviewId, title, userId, username) => {
	console.log(title, description, rating, reviewId)
	return(dispatch) => {
		firebase.database().ref(`reviews/${reviewId}`)
		.set({
			carId,
			description,
			rating,
			title,
			userId,
			username
		})
		dispatch({ type: REVIEW_SAVE_CHANGES })
	}
}

export const reviewDeleted = (reviewId) => {
	return (dispatch) => {
		firebase.database().ref(`reviews/${reviewId}`)
		.set(null)
		dispatch({type: REVIEW_DELETED})
	}
}

export const reviewInitialized = () => {
	return({ 
		type: REVIEW_INITIALIZED
	})
}

export const reviewsFetch = () => {
	return (dispatch) => {
		// const { currentUser } = firebase.auth();
		firebase.database().ref(`reviews`)
			.on('value', snapshot => {
				dispatch({ type: REVIEWS_FETCH_SUCCESS, payload: snapshot.val() })
			})
	}
}
