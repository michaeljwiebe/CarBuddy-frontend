import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ReviewFormReducer from './ReviewFormReducer';
import ReviewsReducer from './ReviewsReducer';
import CarFormReducer from './CarFormReducer';
import CarsReducer from './CarsReducer';
import ReservationsReducer from './ReservationsReducer';
import ReservationFormReducer from './ReservationFormReducer';

export default combineReducers({
	auth: AuthReducer,
	reviews: ReviewsReducer,
	reviewForm: ReviewFormReducer,
	carForm: CarFormReducer,
	cars: CarsReducer,
	reservations: ReservationsReducer,
	reservationForm: ReservationFormReducer

})