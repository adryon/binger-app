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
      'green': '#28A745',
      'red': '#DC3545',
      'blue': '#2196F3',
      'orange': '#f57c00',
      'yellow': '#FFEB3B',
      'purple': '#c2185b',
      'lime': '#cddc39',
    }
    const strokeWidth = this.props.strokeWidth || 5;
    const percentage = (this.props.percentage === undefined || this.props.percentage === 0) ? 0 : this.props.percentage

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
            className="circle-progress"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
              stroke: colors[color]
            }} />
          <text
            style={{fill: colors[color]}}
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