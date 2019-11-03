import React from 'react';
import Avatar from './Avatar';
import SearchBar from './SearchBar';

export default class Navbar extends React.Component{

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
			        <a className="nav-link">Link</a>
			      </li>
			    </ul>
					
					<SearchBar />
					<Avatar />

			  </div>
			</nav>
		)
	}
}
