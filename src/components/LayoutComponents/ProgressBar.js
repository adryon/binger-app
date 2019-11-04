import React from 'react';

export default class ProgressBar extends React.Component{

	render() {

    const {value} = this.props;
    const color = this.props.color || 'green';
    const colors = {
      'green': {
        regular: '#28A745',
        darken: '#186429'
      },
      'red': {
        regular: '#DC3545',
        darken: '#6e1a22'
      },
      'blue': {
        regular: '#2196F3',
        darken: '#1976D2'
      },
      'orange': {
        regular: '#f57c00',
        darken: '#e65100'
      },
      'purple': {
        regular: '#c2185b',
        darken: '#880e4f'
      },
      'lime': {
        regular: '#cddc39',
        darken: '#99aa00'
      },
    }

		return (
      <div>
        <div style={{backgroundColor: colors[color].darken}} className="binger-progress-bar">
          <div className="binger-progress-bar-completed" style={{width: `${value}%`, backgroundColor: colors[color].regular}}></div>
        </div>
      </div>
		)
	}
}