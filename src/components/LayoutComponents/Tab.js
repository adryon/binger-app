import React from 'react';

export default class Tab extends React.Component{

	render() {

    const {children} = this.props;

		return (
      <div className="binger-tab">
        { children }
      </div>
		)
	}
}