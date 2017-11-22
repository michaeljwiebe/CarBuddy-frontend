import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ReviewFormReducer from './ReviewFormReducer';
import ReviewReducer from './ReviewReducer';
// import CarReducer from './CarReducer';

export default combineReducers({
	auth: AuthReducer,
	reviews: ReviewReducer,
	reviewForm: ReviewFormReducer
	// car: CarReducer

})