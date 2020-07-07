import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth';

const rootReducers = combineReducers({
	form,
	authReducer,
});

export default rootReducers;
