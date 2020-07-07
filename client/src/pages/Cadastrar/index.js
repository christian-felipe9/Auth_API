import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../actions';
import CustomInput from '../../Helpers/CustomInput';

class Cadastrar extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async onSubmit(data) {
		await this.props.cadastrar(data);
	}

	render() {
		const { handleSubmit } = this.props;

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
							<button type='submit' className='btn btn-primary'>
								Cadastrar
							</button>
						</form>
					</div>
				</div>
				<div className='col'>
					<div className='container'>
						<div className='text-center'>
							<div className='alert alert-primary'>Ou utilize as Redes Sociais</div>
							<button className='btn btn-default'>Facebook</button>
							<button className='btn btn-default'>Google</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(connect(null, actions), reduxForm({ form: 'cadastrar' }))(Cadastrar);
