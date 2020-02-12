import React from 'react';
//import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import moment from 'moment';
import _ from 'lodash';
import { Button, Tag, Checkbox, Tabs, Tab, ProgressCircle } from 'components/LayoutComponents';
import { userActions, tvseriesActions } from 'actions'

class TVSeriesDetailsPage extends React.Component{

  state = {
    checked: false,
  }

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

  addToWishlist = () => {
    const payload = {
      backdrop_path: this.props.tvseries.viewTVSeriesDetails.backdrop_path,
      id: this.props.tvseries.viewTVSeriesDetails.id,
      title: this.props.tvseries.viewTVSeriesDetails.name,
      date: Date(),
    }
    this.props.addTVSeriesToWishlist(payload, this.props.match.params.id, this.props.user.data.uid);
  }

  removeFromWishlist = () => {
    this.props.removeTVSeriesFromWishlist(this.props.match.params.id, this.props.user.data.uid);
  }

  handleEpisodeCheckbox = (id, status) => {
    let slug = id.split('-');
    const payload = {
      poster_path: this.props.tvseries.viewTVSeriesDetails.poster_path,
      name: this.props.tvseries.viewTVSeriesDetails.original_name,
      user_id: this.props.user.data.uid,
      tv_id: this.props.tvseries.viewTVSeriesDetails.id,
      season_id: slug[0],
      episode_id: slug[1],
    }

    status === true ? this.props.watchEpisode(payload) : this.props.unWatchEpisode(payload);
  }

  handleSeasonCheckbox = (id, status) => {
    this.props.tvseries.viewTVSeriesDetails.seasons.map(season => {
      if (season.id === id) {
        const payload = {
          poster_path: this.props.tvseries.viewTVSeriesDetails.poster_path,
          name: this.props.tvseries.viewTVSeriesDetails.original_name,
          user_id: this.props.user.data.uid,
          tv_id: this.props.tvseries.viewTVSeriesDetails.id,
          season_id: season.id,
          episodes: season.episodes,
        }
        status === true ? this.props.watchSeason(payload) : this.props.unWatchSeason(payload);
      }
    })
  }

  render() {
    const { viewTVSeriesDetails, viewTVSeriesCast } = this.props.tvseries;
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
            <div className="row binger-title-row binger-flex-center">
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
              <ProgressCircle
                strokeWidth="10"
                percentage={80}/>
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

        <div className="row">
          <div className="col-lg-12">
            <div className="card binger-actors-card">
              <div className="card-body">
                <Tabs
                  defaultActiveTab={1}
                >
                  {viewTVSeriesDetails && viewTVSeriesDetails.seasons && viewTVSeriesDetails.seasons.map(season => (
                    <Tab label={season.name} key={season.id}>
                      <div className="binger-flex-center" key={season.id}>
                        <Checkbox
                          onCheckboxChange={this.handleSeasonCheckbox}
                          color="green"
                          name={season.id}
                          checked={
                            season.episodes.length === 
                            _.keys(viewTVSeriesDetails &&
                            viewTVSeriesDetails.userData &&
                            viewTVSeriesDetails.userData.watched &&
                            viewTVSeriesDetails.userData.watched.content &&
                            viewTVSeriesDetails.userData.watched.content[season.id]).length}
                        />
                        <span className="binger-text-strong binger-green ml-5px">I have seen the whole season!</span>
                      </div>
                      {season.episodes.map(episode => (
                        <div className="binger-flex-center" key={episode.id}>
                          <Checkbox
                            color="secondary"
                            onCheckboxChange={this.handleEpisodeCheckbox}
                            name={`${season.id}-${episode.id}`}
                            checked={
                              viewTVSeriesDetails &&
                              viewTVSeriesDetails.userData &&
                              viewTVSeriesDetails.userData.watched &&
                              viewTVSeriesDetails.userData.watched.content &&
                              viewTVSeriesDetails.userData.watched.content[season.id] &&
                              viewTVSeriesDetails.userData.watched.content[season.id][episode.id]}
                          />
                          <span className="binger-text-strong ml-5px">{episode.name}</span>
                        </div>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
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
  watchEpisode: userActions.watchEpisode,
  unWatchEpisode: userActions.unWatchEpisode,
  watchSeason: userActions.watchSeason,
  unWatchSeason: userActions.unWatchSeason,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    tvseries: state.tvseries,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVSeriesDetailsPage);