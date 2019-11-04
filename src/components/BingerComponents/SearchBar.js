import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { appActions } from 'actions';
import { Input } from 'components/LayoutComponents';

class SearchBar extends React.Component{

	state = {
		searchData: []
	}

	search = (name, value) => {
		if (value.length >= 3) {
			this.props.searchMedia(value);
		}
	}

	goToMediaPage = (media) => {
		if (media.media_type === 'movie') {
			this.props.goToMoviePage(media.id);
		} else if (media.media_type === 'tv') {
			this.props.goToTVSeriesPage(media.id);
		}
		this.props.mediaSearchClear();
	}

	render() {

		const {searchData} = this.props.app;

		return (
      <div className="binger-search col-lg-3">
				<Input 
					onInputChange={this.search}
					name="searchBar"
					icon="search"
					type="text"
				/>

				{ searchData.length > 0 && 
					<ul className="binger-search-list">
						{ searchData.map(item => (
								<div 
									key={item.id} 
									onClick={() => this.goToMediaPage(item)}
									className="binger-search-list-item">
									<div className="row">
										<div className="col-lg-2">
											<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt="" height="100" width="67"/>
										</div>
										<div className="col-lg-10">
											<h3><strong>{item.original_title ? item.original_title : item.original_name}</strong></h3>
											<p className={`binger-search-list-item-type ${item.media_type === 'movie'? `binger-blue`: `binger-lime`}`}>{item.media_type}</p>
										</div>
									</div>
								</div>
							))
						}
					</ul>
				}
      </div>
		)
	}
}

const mapDispatchToProps = {
	searchMedia: appActions.searchMedia,
	mediaSearchClear: appActions.mediaSearchClear,
	goToMoviePage: (id) => dispatch => dispatch(push(`/movie/${id}`)),
	goToTVSeriesPage: (id) => dispatch => dispatch(push(`/tv/${id}`)),
};

function mapStateToProps(state) {
  return {
		app: state.app,
		user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
