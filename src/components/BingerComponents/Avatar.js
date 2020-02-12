import React from 'react';
import { connect } from 'react-redux'
import { userActions } from 'actions';

class Avatar extends React.Component{

	render() {

		return (
      <div>
	      <div className="binger-avatar" id="navbardrop" data-toggle="dropdown">
          <img src={process.env.PUBLIC_URL + "/images/cartman.png"} alt="placeholder"/>
        </div>
	      <div className="dropdown-menu dropdown-menu-right">
	      	<div className="dropdown-header">Email: {this.props.user && this.props.user.data ? this.props.user.data.email : null}</div>

					<button
						type="button"
						className="link-button dropdown-item"
						onClick={this.props.logOut}>
						<span>
							<i className={`fas fa-sign-out-alt`}></i>
						</span>{' '}Sign Out
					</button>

	      </div>
      </div>
		)
	}
}

const mapDispatchToProps = {
	logOut: userActions.logOut,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
