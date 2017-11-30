import { CARS_FETCH_SUCCESS } from '../actions/types';

const initialState = {}

export default (state = initialState, action) => {
	console.log('cars reducer', action)
	switch (action.type) {
		case CARS_FETCH_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}