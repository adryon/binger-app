import React from 'react';

export default class Button extends React.Component{

	render() {

		const {icon, text, className, style} = this.props;
		const type = this.props.type || 'button';
    const shape = this.props.shape || 'normal';
    const show = this.props.show === undefined ? true : this.props.show;
    const expandTextOnHover = this.props.expandTextOnHover || false;
		const onButtonClick = this.props.onButtonClick || (() => {});

		return ( show &&
      <button
        className={`${className} binger-btn binger-btn-${shape}`}
        style={style}
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