import React from 'react';
import Input from 'components/LayoutComponents/Input';

class Form extends React.Component {

  state = {}

  constructor(props) {
    super(props);

    this.props.children.map(item => {
      if (item.type === Input) {
        this.state[item.props.name] = {
          value: '',
          isValid: true,
        }
      }
    })

    this.handleChange = this.handleChange.bind(this);
  }

  validateForm = () => {
    return new Promise((resolve,reject) => {
      var inputArray = this.state;
      var values = {};
      var isValidForm = true;
      Object.keys(inputArray).map(item => {
        if (inputArray[item].value === '') {
          inputArray[item].isValid = false;
          isValidForm = false;
        } else {
          values[item] = inputArray[item].value;
          inputArray[item].isValid = true;
        }
      })
      this.setState(inputArray);
      isValidForm ? resolve(values) : reject("You need to fill the required fields!");
    })
  }

  handleChange(name, value) {
    var inputArray = this.state;
    inputArray[name].value = value;
    this.setState(inputArray);
  }

	render() {
    const {children} = this.props;
    return (
      <form onSubmit={this.props.onSubmit}>
        {children.map(item => {
          return item.type === Input ?
            <Input
              key={item.props.name}
              value={this.state[item.props.name].value}
              isValid={this.state[item.props.name].isValid}
              onInputChange={this.handleChange}
              {...item.props} /> : item
        })}
      </form>
    )
	}
}

export default Form;
