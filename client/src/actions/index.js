import axios from 'axios';
import Cookies from 'js-cookie';

import { AUTH_LOGIN, AUTH_ERROR } from './types';

export const oAuthGoogle = data => {
	return async dispatch => {
		const response = await axios.post(
			'http://localhost:5000/users/oauth/google',
			{
				access_token: data,
			}
		);
		console.log(response);
	};
};

export const cadastrar = data => {
	return async dispatch => {
		try {
			const response = await axios.post(
				'http://localhost:5000/users/signup',
				data
			);
			dispatch({
				type: AUTH_LOGIN,
				payload: response.data.token,
			});

			Cookies.set('JWT_TOKEN', response.data.token, { expires: 7 });
		} catch (error) {
			dispatch({
				type: AUTH_ERROR,
				payload: 'E-mail já está em uso. Por favor, utilize outro.',
			});
		}
	};
};
