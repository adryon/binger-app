import React from 'react';
//import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import moment from 'moment';
import { Button, Tag } from 'components/LayoutComponents';
import { moviesActions, userActions } from 'actions'

class MovieDetailsPage extends React.Component{

  componentDidMount() {
    this.props.getMovieDetails(this.props.match.params.id);
    this.props.getMovieCast(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getMovieDetails(this.props.match.params.id);
      this.props.getMovieCast(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.movieDetailsClear();
  }

  onTagSubmit = (tag) => {
    this.props.addTagToMovie(tag, this.props.match.params.id, this.props.user.data.uid);
  }

  onTagClose = (tag) => {
    this.props.deleteTagFromMovie(tag, this.props.match.params.id, this.props.user.data.uid);
  }

  watchMovie = () => {
    const payload = {
      timestamp: Date(),
      poster_path: this.props.movies.viewMovieDetails.poster_path,
      title: this.props.movies.viewMovieDetails.original_title,
    }
    this.props.watchMovie(payload, this.props.match.params.id, this.props.user.data.uid);
  }

  unWatchMovie = () => {
    this.props.unWatchMovie(this.props.match.params.id, this.props.user.data.uid);
  }

  addToFavorite = () => {
    const payload = {
      poster_path: this.props.movies.viewMovieDetails.poster_path,
      title: this.props.movies.viewMovieDetails.title,
    }
    this.props.addMovieToFavorite(payload, this.props.match.params.id, this.props.user.data.uid);
  }

  removeFromFavorite = () => {
    this.props.removeMovieFromFavorite(this.props.match.params.id, this.props.user.data.uid);
  }

  addToWishlist = () => {
    const payload = {
      poster_path: this.props.movies.viewMovieDetails.poster_path,
      id: this.props.movies.viewMovieDetails.id,
      title: this.props.movies.viewMovieDetails.title,
      date: Date()
    }
    this.props.addMovieToWishlist(payload, this.props.match.params.id, this.props.user.data.uid);
  }

  removeFromWishlist = () => {
    this.props.removeMovieFromWishlist(this.props.match.params.id, this.props.user.data.uid);
  }

  render() {
    const { viewMovieDetails, viewMovieCast } = this.props.movies;
    return ( viewMovieDetails &&
      <div className="content container">
        <div className="row">
          <div className="col-lg-3">
            <div className="align-end">
              <img className="movie-poster" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${viewMovieDetails.poster_path}`} alt=""/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row binger-title-row">
              <div className="movie-title">
                {viewMovieDetails.original_title}
                <span className="movie-year">
                  {moment(viewMovieDetails.release_date).format('YYYY')}
                </span>
              </div>
            </div>
            <div className="row binger-title-row">
              {viewMovieDetails.userData.watched &&
                <Button 
                  className="mr-4 binger-btn-green"
                  onButtonClick={this.unWatchMovie}
                  expandTextOnHover={true}
                  icon="eye"
                  text="Watched" /> ||
                <Button 
                  className="mr-4 binger-btn-blue"
                  onButtonClick={this.watchMovie}
                  expandTextOnHover={true}
                  icon="eye-slash"
                  text="Not watched" />
              }
              {viewMovieDetails.userData.favorite &&
                <Button 
                  className="mr-4 binger-btn-green"
                  onButtonClick={this.removeFromFavorite}
                  expandTextOnHover={true}
                  icon="heart"
                  text="Added to Favorite" /> ||
                <Button 
                  className="mr-4 binger-btn-blue"
                  onButtonClick={this.addToFavorite}
                  expandTextOnHover={true}
                  icon="heart"
                  text="Add to Favorite" />
              }
              {viewMovieDetails.userData.wishlist &&
                <Button 
                  className="mr-4 binger-btn-green"
                  onButtonClick={this.removeFromWishlist}
                  expandTextOnHover={true}
                  icon="star"
                  text="In Wishlist" /> ||
                <Button
                  className="mr-4 binger-btn-blue"
                  onButtonClick={this.addToWishlist}
                  expandTextOnHover={true}
                  icon="star"
                  text="Add to Wishlist" />
              }
              { viewMovieDetails.userData.watched &&
                <div className="binger-flex-center">
                  <span className="binger-text"> You have watched this movie on {moment(viewMovieDetails.userData.watched.timestamp).format('DD/MM/YYYY')}</span>
                </div>
              }
            </div>
            <div className="row binger-title-row">
              <div className="card">
                <div className="card-body">
                  <div className="row binger-flex-center">
                    <span className="binger-text-strong">Tags</span>
                    { viewMovieDetails.userData && viewMovieDetails.userData.tags && viewMovieDetails.userData.tags.map(tag => (
                      <Tag
                        text={tag.text}
                        key={tag.uid}
                        uid={tag.uid}
                        closable={true}
                        onTagClose={this.onTagClose}
                        color={tag.color} />
                      ))
                    }
                    <Tag 
                      type="add"
                      onTagSubmit={this.onTagSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card binger-actors-card">
              <div className="card-body">
                <div className="row binger-flex-baseline">

                  {viewMovieCast && viewMovieCast.cast.slice(0,6).map((actor, index) => (
                    <div key={index} className={`col-12 col-sm-6 col-md-4 col-lg-2 binger-actors-item`}>
                        <img className="binger-actors-image" src={`https://image.tmdb.org/t/p/w138_and_h175_face${actor.profile_path}`} alt=""/>

                        <span className="binger-actors-name">{actor.name}</span>
                        <span className="binger-actors-character">{actor.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getMovieDetails: moviesActions.getMovieDetails,
  getMovieCast: moviesActions.getMovieCast,
  addTagToMovie: userActions.addTagToMovie,
  deleteTagFromMovie: userActions.deleteTagFromMovie,
  watchMovie: userActions.watchMovie,
  unWatchMovie: userActions.unWatchMovie,
  addMovieToFavorite: userActions.addMovieToFavorite,
  removeMovieFromFavorite: userActions.removeMovieFromFavorite,
  addMovieToWishlist: userActions.addMovieToWishlist,
  removeMovieFromWishlist: userActions.removeMovieFromWishlist,
  movieDetailsClear: moviesActions.movieDetailsClear,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user,
    movies: state.movies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);