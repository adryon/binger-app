import React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { ProgressBar, Button} from 'components/LayoutComponents';
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
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Register Page</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>100%</strong></h3>
										<ProgressBar value={100} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
									<h1><strong>Login Page</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>100%</strong></h3>
										<ProgressBar value={100} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
									<h1><strong>Main Page</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>10%</strong></h3>
										<ProgressBar color="red" value={10} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Movie Details Page</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>80%</strong></h3>
										<ProgressBar value={80} />
									</div>
								</div>
								
								<div className="row">
									<div className="col-lg-5">
										<h1><strong>TV Series Details Page</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>0%</strong></h3>
										<ProgressBar color="red" value={0} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Edit Profile Page</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>0%</strong></h3>
										<ProgressBar color="red" value={0} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Navbar</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>50%</strong></h3>
										<ProgressBar color="lime" value={50} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Wishlist Widget</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>0%</strong></h3>
										<ProgressBar color="blue" value={0} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Currently Watching Widget</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>0%</strong></h3>
										<ProgressBar color="blue" value={0} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Watched Widget</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>0%</strong></h3>
										<ProgressBar color="blue" value={0} />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-5">
										<h1><strong>Activity Widget</strong></h1>
									</div>
									<div className="col-lg-5">
										<h3><strong>0%</strong></h3>
										<ProgressBar color="blue" value={0} />
									</div>
								</div>
							</div>
						</div>
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
