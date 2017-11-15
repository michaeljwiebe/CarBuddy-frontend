import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED, 
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAILURE, 
	LOGIN_USER 
} from '../actions/types';

const initialState = {
	email: '',
	password: '',
	user: null,
	error: ''
}

export default ( state = initialState, action ) => {
	console.log(action);
	switch(action.type){
		case EMAIL_CHANGED:
			return { ...state, email: action.payload }
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload }
		case LOGIN_USER_SUCCESS:
			return { ...state, ...initialState, user: action.payload }
		case LOGIN_USER_FAILURE:
			return { ...state, error: 'Authentication Failed', password: '' }
		case LOGIN_USER:
			return { ...state, error: ''}
		default:
			return state
	}
}