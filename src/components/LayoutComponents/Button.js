import React from 'react';

export default class Button extends React.Component{

	render() {

		const {icon, text} = this.props;
		const type = this.props.type || 'button';
		const onButtonClick = this.props.onButtonClick || (() => {});

		return (
      <button
        className="binger-btn"
        type={type}
        onClick={(event) => onButtonClick(event)}>
        { icon && (
            <span className="binger-btn-icon">
    					<i className={`fas fa-${icon}`}></i>
    				</span>
          )
        }
        { text && (
            <span className="binger-btn-text">{text}</span>
          )
        }
      </button>
		)
	}
}
