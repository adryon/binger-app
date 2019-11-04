import React from 'react';
import _ from  'lodash';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { userActions } from 'actions';
import { Input, Button, Form} from 'components/LayoutComponents';

class RegisterPage extends React.Component{

	handleSubmit = (event) => {
		event.preventDefault();
		this.form.validateForm()
		.then(values => {
			const payload = _.pick(values, ['email', 'password', 'name']);
	    this.props.register(payload);
		})
		.catch(error => {
			console.log(error);
		})
	}

	render() {
		return (
			<div className="main-page">
				<div className="main-logo">
					<img
						src={process.env.PUBLIC_URL + "/images/mediatec-inverse.png"}
	          alt="Binger Logo"/>
				</div>
				<div className="main-card card col-xl-5 col-lg-6 col-md-8">
					<div className="main-card-title card-title">
						<h3>Please Register</h3>
					</div>
				  <div className="main-card-body card-body">
						<Form
							onSubmit={this.handleSubmit}
							ref={c => {this.form = c}}>
							<Input
								required
								label="Name"
								name="name"
								icon="user"
								type="text" />
							<Input
								required
								label="Email"
								name="email"
								icon="envelope"
								type="email" />
							<Input
								required
								label="Password"
								name="password"
								icon="lock"
								type="password" />
							<Input
								required
								label="Confirm Password"
								name="confirmPassword"
								icon="lock"
								type="password" />

							<div className="form-group">
								<div className="binger-flex-center">
									<Button
										text="Register"
										type="submit"/>
									<div className="m-2">
										<span
											className="binger-btn-link"
											onClick={this.props.goToLogin}>
											Log in
										</span>
										<span className="text-white">
			              	{' if you already have an account!'}
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
  register: userActions.register,
	goToLogin: () => dispatch => dispatch(push('/login'))
};

export default connect(null, mapDispatchToProps)(RegisterPage);
