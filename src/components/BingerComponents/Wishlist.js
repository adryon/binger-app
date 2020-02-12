import React from 'react'
import moment from 'moment';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Tabs, Tab, Button } from 'components/LayoutComponents';
import { userActions } from 'actions'

class Wishlist extends React.Component {

  state = {
    showButton: {}
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.data && this.props.user.data.uid && !prevProps.user.data.uid) {
      this.props.getTVSeriesWishlist(this.props.user.data.uid);
      this.props.getMoviesWishlist(this.props.user.data.uid);
    }
  }

  showDeleteButton = (id) => {
    var {showButton} = this.state;
    showButton[id] = true;
    this.setState({showButton});
  }

  hideDeleteButton = (id) => {
    var {showButton} = this.state;
    delete showButton[id];
    this.setState({showButton});
  }

  render() {
    return (
      <div className="card binger-wishlist-card">
        <div className="card-body">
          <span className="binger-text-strong binger-wishlist-title">
            Wishlist
          </span>
          <Tabs defaultActiveTab={1}>
            <Tab label="TV Series">
              {this.props.user.tvSeriesWishlist.map(item => (
                <div 
                  key={item.id} 
                  className="binger-wishlist-item"
                  onMouseEnter={() => this.showDeleteButton(item.id)}
                  onMouseLeave={() => this.hideDeleteButton(item.id)}>
                  <div className="row">
                    <div className="col-lg-2">
                      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.backdrop_path}`} alt="" height="100" width="67"/>
                    </div>
                    <div className="col-lg-8">
                      <h3><strong>{item.title}</strong></h3>
                      <p className="binger-lime">Added on {moment(item.date).format("DD/MM/YYYY HH:mm")}</p>
                    </div>
                    <div className="col-lg-2 binger-flex-center">
                      <Button 
                        show={this.state.showButton[item.id] !== undefined ? this.state.showButton[item.id] : false}
                        onButtonClick={() => this.props.removeTVSeriesFromWishlist(item.id, this.props.user.data.uid)}
                        ref={`delete-${item.id}`}
                        className="mr-4 binger-btn-red"
                        icon="times" />
                    </div>
                  </div>
                </div>
              ))}
            </Tab>
            <Tab label="Movies">
              {this.props.user.moviesWishlist.map(item => (
                <div 
                  key={item.id} 
                  className="binger-wishlist-item"
                  onMouseEnter={() => this.showDeleteButton(item.id)}
                  onMouseLeave={() => this.hideDeleteButton(item.id)}>
                  <div className="row">
                    <div className="col-lg-2">
                      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt="" height="100" width="67"/>
                    </div>
                    <div className="col-lg-8">
                      <h3><strong>{item.title}</strong></h3>
                      <p className="binger-lime">Added on {moment(item.date).format("DD/MM/YYYY HH:mm")}</p>
                    </div>
                    <div className="col-lg-2 binger-flex-center">
                      <Button 
                        show={this.state.showButton[item.id] !== undefined ? this.state.showButton[item.id] : false}
                        onButtonClick={() => this.props.removeMovieFromWishlist(item.id, this.props.user.data.uid)}
                        ref={`delete-${item.id}`}
                        className="mr-4 binger-btn-red"
                        icon="times" />
                    </div>
                  </div>
                </div>
              ))}
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getTVSeriesWishlist: userActions.getTVSeriesWishlist,
  getMoviesWishlist: userActions.getMoviesWishlist,
  removeMovieFromWishlist: userActions.removeMovieFromWishlist,
  removeTVSeriesFromWishlist: userActions.removeTVSeriesFromWishlist,
  goToMoviePage: (id) => dispatch => dispatch(push(`/movie/${id}`)),
	goToTVSeriesPage: (id) => dispatch => dispatch(push(`/tv/${id}`)),
};

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user,
    tvseries: state.tvseries,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
