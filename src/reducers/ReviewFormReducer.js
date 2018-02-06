import { 
	REVIEW_TITLE_CHANGED, 
	REVIEW_DESCRIPTION_CHANGED,
	REVIEW_RATING_CHANGED,
	REVIEW_CREATED,
	REVIEW_SAVE_CHANGES,
	REVIEW_INITIALIZED
} from '../actions/types';

const initialState = {
	title: '',
	description: '',
	rating: ''
}

export default ( state = initialState, action) => {
	switch (action.type){
		case REVIEW_TITLE_CHANGED:
			return {...state, title: action.payload}
		case REVIEW_DESCRIPTION_CHANGED:
			return {...state, description: action.payload}
		case REVIEW_RATING_CHANGED:
			return {...state, rating: action.payload}
		case REVIEW_CREATED:
			return {...state, ...initialState}
		case REVIEW_SAVE_CHANGES:
			return {...initialState }
		case REVIEW_INITIALIZED:
			return { ...initialState }
		default:
			return {...state}
	}
}