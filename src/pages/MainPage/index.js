import React from 'react';
import _ from  'lodash';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { userActions } from 'actions';
import Input from 'components/LayoutComponents/Input';
import Button from 'components/LayoutComponents/Button';

class MainPage extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
    	username: '',
    	password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
  	const payload = _.pick(this.state, ['username', 'password']);
    this.props.login(payload);
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
						<h3>Main Page</h3>
					</div>
				  <div className="main-card-body card-body">
				    <form onSubmit={this.handleSubmit}>
							<Input
								label="Username"
								name="username"
								value={this.state.username}
								icon="user"
								type="text"
								onInputChange={this.handleChange} />
							<Input
								label="Password"
								name="password"
								value={this.state.password}
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

const mapDispatchToProps = {
  login: userActions.login,
	goToRegister: () => dispatch => dispatch(push('/register'))
};

export default connect(null, mapDispatchToProps)(MainPage);
