import { 
	CAR_CREATED,
	CAR_MAKE_MODEL_CHANGED,
	CAR_YEAR_CHANGED,
	CAR_PRICE_CHANGED,
	CAR_MILEAGE_CHANGED
} from '../actions/types';

const initialState = {
	makeModel: '',
	year: '',
	price:'',
	mileage:'',
	message: ''
}

export default ( state = initialState, action ) => {
	switch(action.type){
		case CAR_CREATED:
			return { ...state, ...initialState, message: 'Car Created'}
		case CAR_MAKE_MODEL_CHANGED:
			return { ...state, makeModel: action.payload }
		case CAR_YEAR_CHANGED:
			return { ...state, year: action.payload }
		case CAR_PRICE_CHANGED:
			return { ...state, price: action.payload }
		case CAR_MILEAGE_CHANGED:
			return { ...state, mileage: action.payload }
		default:
			return state
	}
}