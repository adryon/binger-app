import React from 'react';

export default class Input extends React.Component{

	render() {

		const {label, icon, placeholder, name, value, isValid} = this.props;
		const type = this.props.type || 'text';
		const onInputChange = this.props.onInputChange || (() => {});

		return (
			<div className="form-group">
	      <div className="binger-input">
					<label className="binger-input-label">{label}</label>
					<span className="binger-input-icon">
						<i className={`fas fa-${icon}`}></i>
					</span>
	        <input
						className={`binger-input-field ${!isValid ? 'binger-input-not-valid' : null}`}
						placeholder={placeholder}
						type={type}
						value={value}
						onChange={(event) => onInputChange(name, event.target.value)} />
	      </div>
			</div>
		)
	}
}
