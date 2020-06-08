import React from 'react';

export class CardHeader extends React.Component {
  render() {
    const {children} = this.props;
    return ( children )
	}
}

export class CardBody extends React.Component {
  render() {
    const {children} = this.props;
    return ( children )
	}
}

export class CardFooter extends React.Component {
  render() {
    const {children} = this.props;
    return ( children )
	}
}

export class Card extends React.Component {

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

    return (
      <div className="card binger-card">
        {children[0] && children[0].type === CardHeader ? <div className="binger-card-header">{children[0]}</div> : null}
        {children[1] && children[1].type === CardBody ? <div className="binger-card-body">{children[1]}</div> : children[0]}
        {children[2] && children[2].type === CardFooter ? <div className="binger-card-footer">{children[2]}</div> : null}
      </div>
    )
	}
}
