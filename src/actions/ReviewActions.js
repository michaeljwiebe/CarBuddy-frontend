import { 
	REVIEW_TITLE_CHANGED, 
	REVIEW_DESCRIPTION_CHANGED, 
	REVIEW_RATING_CHANGED 
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