import React from 'react';
import _ from  'lodash';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { userActions } from 'actions';
import Input from 'components/LayoutComponents/Input';
import Button from 'components/LayoutComponents/Button';

class RegisterPage extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
			name: '',
    	email: '',
    	password: '',
			confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = _.pick(this.state, ['email', 'password']);
    this.props.login(payload, this.props.history);
  }

	render() {
		return (
			<div className="main-page">
				<div className="main-logo">
					<img
						src="/images/mediatec-inverse.png"
	          alt="Binger Logo"/>
				</div>
				<div className="main-card card col-xl-5 col-lg-6 col-md-8">
					<div className="main-card-title card-title">
						<h3>Please Log In</h3>
					</div>
				  <div className="main-card-body card-body">
				    <form onSubmit={this.handleSubmit}>
							<Input
								label="Name"
								name="name"
								value={this.state.name}
								icon="user"
								type="text"
								onInputChange={this.handleChange} />
							<Input
								label="Email"
								name="email"
								value={this.state.email}
								icon="envelope"
								type="email"
								onInputChange={this.handleChange} />
							<Input
								label="Password"
								name="password"
								value={this.state.password}
								icon="lock"
								type="password"
								onInputChange={this.handleChange} />
							<Input
								label="Confirm Password"
								name="confirmPassword"
								value={this.state.confirmPassword}
								icon="lock"
								type="password"
								onInputChange={this.handleChange} />

							<div className="form-group">
								<div className="binger-flex-center">
									<Button
										text="Sign in"
										type="submit"/>
									<div className="m-2 binger-flex-baseline">
										<button
											className="btn btn-link binger-btn-link"
											onClick={this.props.goToRegister}>
											Register
										</button>
										<span className="text-white">
			              	{' '}if you don't have an account!
										</span>
									</div>
								</div>
		          </div>
						</form>
				  </div>
				</div>
			</div>
		)
	}
}

/*const mapDispatchToProps = {
  login: userActions.login,
};*/

/*function mapStateToProps(state) {
  return {
  	user: state.user,
  }
}*/

export default RegisterPage;

//export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
