import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED, 
	NAME_CHANGED,
	ADDRESS_CHANGED,
	ZIP_CHANGED,
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAILURE, 
	LOGIN_USER,
	LOGOUT_USER,
	UPDATE_USER
} from '../actions/types';

const initialState = {
	email: '',
	password: '',
	user: null,
	error: '',
	address: 'address'
}

export default ( state = initialState, action ) => {
	console.log(action);
	switch(action.type){
		case EMAIL_CHANGED:
			return { ...state, email: action.payload }
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload }
		case NAME_CHANGED:
			return { ...state, name: action.payload }
		case ADDRESS_CHANGED:
			return { ...state, address: action.payload }
		case ZIP_CHANGED:
			return { ...state, zip: action.payload }
		case UPDATE_USER:
			return { ...state, ...action.payload }
		case LOGIN_USER_SUCCESS:
			return { ...state, user: action.payload }
		case LOGIN_USER_FAILURE:
			return { ...state, error: 'Authentication Failed', password: '' }
		case LOGIN_USER:
			return { ...state, error: '' }
		case LOGOUT_USER:
			return { ...state, user: null }
		default:
			return state
	}
}