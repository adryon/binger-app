import React from 'react';

export default class Tabs extends React.Component {

  state = {
    activeTab: this.props.defaultActiveTab - 1 || 0,
  }

  handleTabChange = (index) => {
    this.setState({activeTab: index});
    const onTabChange = this.props.onTabChange || (() => {});
    onTabChange(index + 1);
  }

	render() {
    const {children} = this.props;
    const {activeTab} = this.state;

    return (
      <div className="binger-tabs">
        <div className="binger-tabs-list">
          { children && children.map((tab, index) => (
            <div 
              key={index}
              className={`binger-tabs-list-item ${index === activeTab ? `binger-tabs-active-tab` : null}`}
              onClick={() => this.handleTabChange(index)}
            >
              {tab && tab.props && tab.props.label}
            </div>
          )) }
        </div>
        <div className="binger-tabs-content">
          {children[activeTab]}
        </div>
      </div>
    )
	}
}
