import { 
	REVIEWS_FETCH_SUCCESS
} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
	switch(action.type){
		case REVIEWS_FETCH_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}