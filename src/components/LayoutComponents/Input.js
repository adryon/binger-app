import React from 'react';

class Input extends React.Component{

	render() {

		const {label, icon, placeholder, name, value} = this.props;
		const type = this.props.type || 'text';
		const onInputChange = this.props.onInputChange || (() => {});

		return (
			<div className="form-group">
	      <div className="main-area">
					<label className="main-label">{label}</label>
					<span className="main-icon">
						<i className={`fas fa-${icon}`}></i>
					</span>
	        <input
						className="main-input"
						placeholder={placeholder}
						type={type}
						value={value}
						onChange={(event) => onInputChange(this.props.name, event.target.value)} />
	      </div>
			</div>
		)
	}
}

export default Input;
