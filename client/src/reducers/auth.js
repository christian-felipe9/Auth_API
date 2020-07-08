import { AUTH_LOGIN, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
	isAuthenticated: false,
	jwtToken: '',
	errorMessage: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTH_LOGIN:
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				errorMessage: '',
			};
		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

export default authReducer;
