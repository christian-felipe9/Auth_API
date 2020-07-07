import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends Component {
	render() {
		return (
			<nav
				className='navbar navbar-expand-lg navbar-dark bg-dark'
				style={{ marginBottom: '30px' }}>
				<Link to='/' className='navbar-brand'>
					HC Autenticação
				</Link>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link to='/dashboard' className='nav-link'>
								Dashboard
							</Link>
						</li>
					</ul>
					<ul className='nav navbar-nav ml-auto'>
						<li className='nav-item'>
							<Link to='/cadastrar' className='nav-link'>
								Cadastrar
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/login' className='nav-link'>
								Login
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/sair' className='nav-link'>
								Sair
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
