import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ReviewFormReducer from './ReviewFormReducer';
import ReviewReducer from './ReviewReducer';
import CarFormReducer from './CarFormReducer';

export default combineReducers({
	auth: AuthReducer,
	reviews: ReviewReducer,
	reviewForm: ReviewFormReducer,
	carForm: CarFormReducer

})