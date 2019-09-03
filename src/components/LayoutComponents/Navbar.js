import React from 'react';
import { connect } from 'react-redux'
import { userActions } from 'actions';
import Avatar from 'components/LayoutComponents/Avatar';
import _ from  'lodash';

class Navbar extends React.Component{

	constructor(props) {
    super(props);
    console.log(props);
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAssignedSearch = this.handleAssignedSearch.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.removeAssignedUser = this.removeAssignedUser.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleAssignedSearch(event) {
  	this.setState({assignedSearchInput: event.target.value});

  	var usersList = [];

  	this.props.users.data.map(user => {
  		if (user.name.toLowerCase().includes(event.target.value.toLowerCase())) {
  			usersList.push(user);
  		}
  	})
  	this.setState({usersList: usersList, showUsersList: true});
  }

  onUserClick(user) {
  	this.setState({
  		assignedUser: user,
  		showUsersList: false,
  		showSelectedUser: true,
  		assignedSearchInput: '',
  	});
  }

  removeAssignedUser() {
  	this.setState({
  		assignedUser: {},
  		showUsersList: false,
  		showSelectedUser: false,
  	});
  }

  searchTasks(event) {
  	if (event.target.value !== '') {
  		this.props.updateSearchInput(event.target.value);
  	} else {
  		this.props.dismissSearchInput();
  	}
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = _.pick(this.state, ['title', 'description', 'priority']);
    this.props.newTask(payload, this.state.assignedUser.uid);
  }

  onLogOut() {
  	this.props.logOut();
  }

	render() {

		return (
			<nav class="navbar navbar-expand-lg navbar-light binger-navbar">
			  <a class="navbar-brand" href="#">Binger</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			  </button>

			  <div class="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul class="navbar-nav mr-auto">
			      <li class="nav-item active">
			        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
			      </li>
			      <li class="nav-item">
			        <a class="nav-link" href="#">Link</a>
			      </li>
			    </ul>
			    <form class="form-inline my-2 my-lg-0">
			      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
			      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			    </form>

					<Avatar />
			  </div>
			</nav>
		)
	}
}

const mapDispatchToProps = {
	logOut: userActions.logOut,
	newTask: userActions.newTask,
	updateSearchInput: userActions.updateSearchInput,
	dismissSearchInput: userActions.dismissSearchInput,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    users: state.users,
  }
}

export default connect(null, null)(Navbar);
