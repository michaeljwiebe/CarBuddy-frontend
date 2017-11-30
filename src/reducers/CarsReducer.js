import { CARS_FETCH_SUCCESS } from '../actions/types';

const initialState = {}

export default (state = initialState, action) => {
	console.log('cars reducer', action)
	switch (action.type) {
		case CARS_FETCH_SUCCESS:
			return { ...state, cars: action.payload };
		default:
			return state;
	}
}
/*
export default (state = initialState, action) => {
	switch(action.type){
		case REVIEWS_FETCH_SUCCESS:
			return { ...state, reviews: action.payload };
		default:
			return state;
	}
}
*/