import React from 'react'
import moment from 'moment';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Button } from 'components/LayoutComponents';
import { userActions } from 'actions'

class WatchedMovies extends React.Component {

  state = {
    showButton: {},
    fadeAnimation: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.data && this.props.user.data.uid && !prevProps.user.data.uid) {
      this.props.getCurrentlyWatching(this.props.user.data.uid).then(() => {
        const fadeAnimation = this.props.user.currentlyWatching.map(item => false);
        this.setState({fadeAnimation});
      });
    }
  }

  handleEpisodeWatch = (tv, index) => {
    const payload = {
      user_id: this.props.user.data.uid,
      tv_poster_path: tv.tv_poster_path,
      tv_name: tv.tv_name,
      tv_id: tv.tv_id,
      season_id: tv.season_id,
      season_number: tv.season_number,
      season_name: tv.season_name,
      episode_id: tv.id,
      episode_season: tv.season_number,
      episode_number: tv.episode_number,
      episode_name: tv.name,
    }
    let {fadeAnimation} = this.state;
    fadeAnimation[index] = true;
    this.setState({fadeAnimation}, () => {
      setTimeout(() => {
        this.props.watchEpisode(payload)
        fadeAnimation[index] = false;
        this.setState({fadeAnimation})
      }, 700);
    })
  }

  render() {

    return (
      <div className="card binger-wishlist-card">
        <div className="card-body">
          <span className="binger-text-strong binger-wishlist-title">
            Currently watching
          </span>

          <div className="row binger-flex-baseline">
            {this.props.user && this.props.user.currentlyWatching.map((tv, index) => (
              <div className={`col-lg-4 ${this.state.fadeAnimation[index] ? 'fadeOut' : 'fadeIn'}`} key={index}>
                <div className="binger-episode-hover-container">
                  <img src={`https://image.tmdb.org/t/p/w227_and_h127_bestv2${tv.still_path}`} alt="Avatar" className="binger-episode-hover-image" />
                  <div className="binger-episode-hover-overlay">
                  <Button 
                    className="mr-4 binger-btn-blue"
                    style={{position: 'absolute', top: '35%', left: '30%'}}
                    onButtonClick={() => this.handleEpisodeWatch(tv, index)}
                    text="Watch" />
                  </div>
                </div>
                <span className="binger-tv-name">{tv.tv_name}</span>
                <span className="binger-episode-name">{`(S${tv.season_number.toString().padStart(2, '0')} E${tv.episode_number.toString().padStart(2, '0')}) ${tv.name}`}</span>
              </div>
            ))
            
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getCurrentlyWatching: userActions.getCurrentlyWatching,
  watchEpisode: userActions.watchEpisode,
  // getMoviesWishlist: userActions.getMoviesWishlist,
  // removeMovieFromWishlist: userActions.removeMovieFromWishlist,
  // removeTVSeriesFromWishlist: userActions.removeTVSeriesFromWishlist,
  // goToMoviePage: (id) => dispatch => dispatch(push(`/movie/${id}`)),
	// goToTVSeriesPage: (id) => dispatch => dispatch(push(`/tv/${id}`)),
};

function mapStateToProps(state) {
  return {
    user: state.user,
    tvseries: state.tvseries,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchedMovies);
