import React from 'react';

export default class Tag extends React.Component{

  state = {
    show: true,
    type: this.props.type || 'normal',
    inputText: '',
  }

  setTagType = (type) => {
    this.setState({type: type});
  }

  onTagClose = () => {
    const onTagClose = this.props.onTagClose || (() => {});
    this.setState({show: false});
    onTagClose({
      text: this.props.text,
      color: this.props.color,
      uid: this.props.uid,
    });
  }

  handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const onTagSubmit = this.props.onTagSubmit || (() => {});
      onTagSubmit(this.state.inputText);
      this.setState({inputText: '', type: 'add'});
    }
  }

  handleInputChange = (e) => {
    this.setState({inputText: e.target.value})
  }

	render() {

    const { icon, text, color, className } = this.props;
    const { type, inputText } = this.state;
    const closable = this.props.closable || false;

    return (
      <div>
      { type === 'normal' &&
        <div
          style={{backgroundColor: color}}
          className={`${className} binger-tag`}
        >
          { icon && (
            <span className="binger-tag-icon">
              <i className={`fas fa-${icon} fa-fw`}></i>
            </span>
          )}
          { text && (
            <span className="binger-tag-text">
              {text}
            </span>
          )}
          { closable &&
            <span 
              className="binger-tag-close-icon"
              onClick={this.onTagClose}>
              <i className="far fa-times-circle"></i>
            </span>
          }
        </div>
      }

      { type === 'add' &&
        <div 
          className="binger-tag"
          onClick={() => this.setTagType('input')}>
          <div className="binger-tag-add">
            <span className="binger-tag-icon">
              <i className="fas fa-plus"></i>
            </span>
            <span className="binger-tag-text">
              New Tag
            </span>
          </div>
        </div>
      }

      { type === 'input' &&
        <div className="binger-tag">
          <input 
            autoFocus
            onKeyDown={this.handleInputKeyDown}
            onChange={this.handleInputChange}
            value={inputText}
            className="binger-tag-input" 
            type="text"/>
          <span 
            className="binger-tag-cancel-icon"
            onClick={() => this.setTagType('add')}>
            <i className="far fa-times-circle"></i>
          </span>
        </div>
      }
      
      { type === 'hidden' && null }
      </div>
    );
	}
}