import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { GoogleLogin } from 'react-google-login-component';
import { FacebookLogin } from 'react-facebook-login-component';

import config from '../../configuration';
import * as actions from '../../actions';
import CustomInput from '../../Helpers/CustomInput';

class Cadastrar extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
	}

	async onSubmit(data) {
		await this.props.cadastrar(data);
	}

	async responseGoogle(res) {
		console.log('response google', res);
		await this.props.oAuthGoogle(res.wc.access_token);
	}

	async responseFacebook(res) {
		console.log('response facebook', res);
	}

	render() {
		const { handleSubmit, errorMessage } = this.props;
		return (
			<div className='row'>
				<div className='col'>
					<div className='container'>
						<form onSubmit={handleSubmit(this.onSubmit)}>
							<fieldset>
								<Field
									name='email'
									type='text'
									id='email'
									component={CustomInput}
									label='Entre com o seu E-mail:'
									placeholder='exemplo@123.com'
									style={{ textAlign: 'center' }}
								/>
							</fieldset>
							<fieldset>
								<Field
									name='password'
									type='password'
									id='password'
									component={CustomInput}
									label='Entre com a sua Senha:'
									placeholder='123456789'
									style={{ textAlign: 'center' }}
								/>
							</fieldset>

							{errorMessage && (
								<div className='text-center'>
									<div className='alert alert-danger'>{errorMessage}</div>
								</div>
							)}
							<div className='text-center'>
								<button type='submit' className='btn btn-primary'>
									Cadastrar
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className='col'>
					<div className='container'>
						<div className='text-center'>
							<div className='alert alert-primary'>
								Ou utilize as Redes Sociais
							</div>
							<FacebookLogin
								socialId={config.OAUTH.FACEBOOK.FACEBOOK_CLIENT_ID_OAUTH}
								language='pt_BR'
								scope='public_profile,email'
								responseHandler={this.responseFacebook}
								xfbml={true}
								fields='email,name,picture'
								version='v2.5'
								className='btn btn-outline-primary'
								style={{ marginRight: '20px' }}
								buttonText='Facebook'
							/>
							<GoogleLogin
								socialId={config.OAUTH.GOOGLE.GOOGLE_CLIENT_ID_OAUTH}
								className='btn btn-outline-danger'
								scope='profile'
								fields='email,name,picture'
								fetchBasicProfile={false}
								responseHandler={this.responseGoogle}
								buttonText='Google'
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.authReducer.errorMessage,
	};
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({ form: 'cadastrar' })
)(Cadastrar);
