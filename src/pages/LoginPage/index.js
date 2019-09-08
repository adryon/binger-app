import React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { userActions } from 'actions';
import { Input, Button, Form} from 'components/LayoutComponents';

class LoginPage extends React.Component{

	handleSubmit = (event) => {
		event.preventDefault();
		this.form.validateForm()
		.then(payload => {
	    this.props.login(payload);
		})
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
						<Form
							onSubmit={this.handleSubmit}
							ref={c => {this.form = c}}>
							<Input
								required
								label="Email"
								name="email"
								icon="user"
								type="text" />
							<Input
								required
								label="Password"
								name="password"
								icon="lock"
								type="password" />

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
			              	{' if you do not have an account!'}
										</span>
									</div>
								</div>
		          </div>
						</Form>
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

export default connect(null, mapDispatchToProps)(LoginPage);
