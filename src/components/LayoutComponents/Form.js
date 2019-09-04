import React from 'react';
import Input from 'components/LayoutComponents/Input';

class Form extends React.Component {

  state = {
    inputArray: [],
  }

  componentDidMount() {
    var inputArray = [];

    this.props.children.map(item => {
      if (item.type === Input) {
        inputArray[item.props.name] = item.props.value
      }
    })

    this.setState({inputArray: inputArray});
  }

	render() {
    return (this.props.children);
	}
}

export default Form;
