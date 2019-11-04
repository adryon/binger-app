import React from 'react';
//import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import moment from 'moment';
import { Button, Tag } from 'components/LayoutComponents';
import { userActions, tvseriesActions } from 'actions'

class TVSeriesDetailsPage extends React.Component{

  componentDidMount() {
    this.props.getTVSeriesDetails(this.props.match.params.id);
    this.props.getTVSeriesCast(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getTVSeriesDetails(this.props.match.params.id);
      this.props.getTVSeriesCast(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.tvseriesDetailsClear();
  }

  onTagSubmit = (tag) => {
    this.props.addTagToTVSeries(tag, this.props.match.params.id, this.props.user.data.uid);
  }

  onTagClose = (tag) => {
    this.props.deleteTagFromTVSeries(tag, this.props.match.params.id, this.props.user.data.uid);
  }

  watchMovie = () => {
    this.props.watchMovie(this.props.match.params.id, this.props.user.data.uid);
  }

  unWatchMovie = () => {
    this.props.unWatchMovie(this.props.match.params.id, this.props.user.data.uid);
  }

  addToWishlist = () => {
    const payload = {
      backdrop_path: this.props.tvseries.viewTVSeriesDetails.backdrop_path,
      id: this.props.tvseries.viewTVSeriesDetails.id,
      title: this.props.tvseries.viewTVSeriesDetails.name,
    }
    this.props.addTVSeriesToWishlist(payload, this.props.match.params.id, this.props.user.data.uid);
  }

  removeFromWishlist = () => {
    this.props.removeTVSeriesFromWishlist(this.props.match.params.id, this.props.user.data.uid);
  }

  render() {
    const { viewTVSeriesDetails, viewTVSeriesCast } = this.props.tvseries;
    console.log(viewTVSeriesDetails);
    return ( viewTVSeriesDetails &&
      <div className="content container">
        <div className="row">
          <div className="col-lg-3">
            <div className="align-end">
              <img className="movie-poster" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${viewTVSeriesDetails.poster_path}`} alt=""/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row binger-title-row">
              <div className="movie-title">
                {viewTVSeriesDetails.original_name}
                <span className="movie-year">
                  {moment(viewTVSeriesDetails.first_air_date).format('YYYY')}
                </span>
              </div>
            </div>
            <div className="row binger-title-row">
              {viewTVSeriesDetails.userData.watched &&
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
              {viewTVSeriesDetails.isFavourite &&
                <Button 
                  className="mr-4 binger-btn-green"
                  expandTextOnHover={true}
                  icon="heart"
                  text="Added to Favorite" /> ||
                <Button 
                  className="mr-4 binger-btn-blue"
                  expandTextOnHover={true}
                  icon="heart"
                  text="Add to Favorite" />
              }
              {viewTVSeriesDetails.userData.wishlist &&
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
              { viewTVSeriesDetails.userData.watched &&
                <div className="binger-flex-center">
                  <span className="binger-text"> You have watched this tv series on {moment(viewTVSeriesDetails.userData.watched.timestamp).format('DD/MM/YYYY')}</span>
                </div>
              }
            </div>
            <div className="row binger-title-row">
              <div className="card">
                <div className="card-body">
                  <div className="row binger-flex-center">
                    <span className="binger-text-strong">Tags</span>
                    { viewTVSeriesDetails.userData && viewTVSeriesDetails.userData.tags && viewTVSeriesDetails.userData.tags.map(tag => (
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

                  {viewTVSeriesCast && viewTVSeriesCast.cast.slice(0,6).map((actor, index) => (
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
  getTVSeriesDetails: tvseriesActions.getTVSeriesDetails,
  getTVSeriesCast: tvseriesActions.getTVSeriesCast,
  addTagToTVSeries: userActions.addTagToTVSeries,
  deleteTagFromTVSeries: userActions.deleteTagFromTVSeries,
  addTVSeriesToWishlist: userActions.addTVSeriesToWishlist,
  removeTVSeriesFromWishlist: userActions.removeTVSeriesFromWishlist,
  tvseriesDetailsClear: tvseriesActions.tvseriesDetailsClear,


  // watchMovie: userActions.watchMovie,
  // unWatchMovie: userActions.unWatchMovie,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    tvseries: state.tvseries,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVSeriesDetailsPage);