import React, { Component } from 'react';

export default class CustomInput extends Component {
	render() {
		const {
			id,
			name,
			type,
			label,
			placeholder,
			input: { value, onChange },
			style,
		} = this.props;

		return (
			<div className='form-group'>
				<label htmlFor={id}>{label}</label>
				<input
					name={name}
					id={id}
					placeholder={placeholder}
					className='form-control'
					type={type}
					value={value}
					onChange={onChange}
					style={style}
				/>
			</div>
		);
	}
}
