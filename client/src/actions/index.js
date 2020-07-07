import axios from 'axios';

export const cadastrar = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post('http://localhost:5000/users/signup', data);
			console.log('response => ', response);
		} catch (error) {
			console.log('error => ', error);
		}
	};
};
