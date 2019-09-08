import React from 'react';

export default class Button extends React.Component{

	render() {

		const {icon, text} = this.props;
		const type = this.props.type || 'button';
		const shape = this.props.shape || 'normal';
		const onButtonClick = this.props.onButtonClick || (() => {});

		return (
      <button
        className={`binger-btn binger-btn-${shape}`}
        type={type}
        onClick={(event) => onButtonClick(event)}>
        { icon && (
            <span className="binger-btn-icon">
    					<i className={`fas fa-${icon} fa-fw`}></i>
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
