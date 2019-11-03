import React from 'react';

export default class Button extends React.Component{

	render() {

		const {icon, text, className} = this.props;
		const type = this.props.type || 'button';
    const shape = this.props.shape || 'normal';
    const expandTextOnHover = this.props.expandTextOnHover || false;
		const onButtonClick = this.props.onButtonClick || (() => {});

		return (
      <button
        className={`${className} binger-btn binger-btn-${shape}`}
        type={type}
        onClick={(event) => onButtonClick(event)}>
        { icon && (
          <span className="binger-btn-icon">
            <i className={`fas fa-${icon} fa-fw`}></i>
          </span>
        )}
        { text && (
          <span className={expandTextOnHover ? "binger-btn-text-expandable" : "binger-btn-text"}>
            {text}
          </span>
        )}
      </button>
		)
	}
}