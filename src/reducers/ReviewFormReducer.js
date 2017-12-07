import { 
	REVIEW_TITLE_CHANGED, 
	REVIEW_DESCRIPTION_CHANGED,
	REVIEW_RATING_CHANGED,
	REVIEW_CREATED
} from '../actions/types';

const initialState = {
	title: '',
	description: '',
	rating: ''
}

export default ( state = initialState, action) => {
	console.log(action)
	switch (action.type){
		case REVIEW_TITLE_CHANGED:
			return {...state, title: action.payload}
		case REVIEW_DESCRIPTION_CHANGED:
			return {...state, description: action.payload}
		case REVIEW_RATING_CHANGED:
			return {...state, rating: action.payload}
		case REVIEW_CREATED:
			return {...state, ...initialState}
		default:
			return {...state}
	}
}