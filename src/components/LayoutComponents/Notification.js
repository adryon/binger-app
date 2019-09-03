import React from 'react';
var ee = require('event-emitter');

const emitter = new ee();

export const notification = (options) => {
  emitter.emit('notification', options);
}

export default class Notification extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      top: -120,
      options: {}
    }

    this.timeout = null;

    emitter.on('notification', (options) => {
      this.onShow(options);
    })
  }

  onShow = (options) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setState({ top: -120}, () => {
        this.timeout = setTimeout(() => {
          this.showNotification(options);
        }, 500);
      });
    } else {
      this.showNotification(options);
    }
  }

  showNotification = (options) => {
    this.setState({
      top: 86,
      options: {
        type: options.type || 'info',
        duration: options.duration || 3000,
        title: options.title || '',
        description: options.description || '',
        icon: options.icon || '',
      }
    }, () => {
      this.timeout = setTimeout(() => {
        this.setState({
          top: -120,
        });
      }, this.state.options.duration);
    })
  }

  render() {
    const {options, top} = this.state;

    return (
      <div style={{top: top}} className={`binger-notification ${options.type}`}>
        {options.icon && (
          <div className="binger-notification-icon">
            <i className={`fas fa-${options.icon}`}></i>
          </div>
        )}
        <div className="binger-notification-text-area">
          {options.title && (
              <span className="binger-notification-title">{options.title}</span>
          )}
          {options.description && (
              <span className="binger-notification-description">{options.description}</span>
          )}
        </div>
      </div>
    )
  }
}
