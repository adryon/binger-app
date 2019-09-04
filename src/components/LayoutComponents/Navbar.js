import React from 'react';
import { connect } from 'react-redux'
import Avatar from 'components/LayoutComponents/Avatar';

class Navbar extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
    	title: '',
    	description: '',
    	priority: '',
    	assignedSearchInput: '',
    	assignedUser: {},
    	showUsersList: false,
    	showSelectedUser: false,
    	usersList: []
    };
  }

	render() {

		return (
			<nav className="navbar navbar-expand-lg navbar-light binger-navbar">
			  <a className="navbar-brand" href="/main">Binger</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item">
			        <a className="nav-link" href="#">Link</a>
			      </li>
			    </ul>
			    <form className="form-inline my-2 my-lg-0">
			      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
			    </form>

					<Avatar />
			  </div>
			</nav>
		)
	}
}

export default connect(null, null)(Navbar);
