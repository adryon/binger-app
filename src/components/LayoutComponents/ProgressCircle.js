import React from 'react';

export default class ProgressCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const size = this.props.size || 90;
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
    const strokeWidth = this.props.strokeWidth || 5;
    const percentage = this.props.percentage || 100;

    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (size - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${size} ${size}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;

    return (
      <svg
          width={size}
          height={size}
          viewBox={viewBox}>
          <circle
            className="circle-background"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
              stroke: colors[color].darken
            }} />
          <text
            style={{fill: colors[color].darken}}
            className="circle-text"
            x="50%"
            y="60%"
            textAnchor="middle">
            {percentage}%
          </text>
      </svg>
    );
  }
}