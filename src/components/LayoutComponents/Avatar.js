import React from 'react';
import { connect } from 'react-redux'
import { userActions } from 'actions';
import _ from  'lodash';

class Avatar extends React.Component{

	render() {

		return (
      <div>
	      <div className="binger-avatar" id="navbardrop" data-toggle="dropdown">
          <img src="http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200" alt="placeholder"/>
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
    users: state.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
