import React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import CurrentlyWatching from 'components/BingerComponents/CurrentlyWatching';

class MainPage extends React.Component{

  render() {
    return (
			<div className="container">
	      <div className="row">
					<div className="col-lg-12">
						<span className="binger-text-strong">
							Page under construction. Please use the search box above.
						</span>
					</div>
	        {/* <div className="col-md-6 col-sm-12">
	          <CurrentlyWatching />
	        </div>
	        <div className="col-md-6 col-sm-12">
	          <CurrentlyWatching />
	        </div>
	        <div className="col-md-6 col-sm-12">
	          <CurrentlyWatching />
	        </div>
	        <div className="col-md-6 col-sm-12">
	          <CurrentlyWatching />
	        </div> */}
	      </div>
			</div>
    )
  }
}

const mapDispatchToProps = {
	goToRegister: () => dispatch => dispatch(push('/register'))
};

export default connect(null, mapDispatchToProps)(MainPage);
