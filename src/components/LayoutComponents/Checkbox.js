import React from 'react';

export default class Input extends React.Component{
  onCheckboxChange = () => {
    const onCheckboxChange = this.props.onCheckboxChange || (() => {});
    onCheckboxChange(this.props.name, !this.props.checked);
  }

	render() {
    const {label } = this.props;
    const checked = this.props.checked || false;

		return (
			<div>
        {checked ? 
          <span onClick={this.onCheckboxChange} className="binger-checkbox-is-not-checked">
            <i className="far fa-check-square"></i>
          </span> :
          <span onClick={this.onCheckboxChange} className="binger-checkbox-is-checked">
            <i className="far fa-square"></i>
          </span>
        }
      </div>
		)
	}
}
