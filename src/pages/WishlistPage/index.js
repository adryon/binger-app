import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Table, Tag, Card, CardHeader, CardBody, Button } from 'components/LayoutComponents';
import { userActions } from 'actions'

class WishlistPage extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.user.data && this.props.user.data.uid && !prevProps.user.data.uid) {
      this.props.getFullWishlist(this.props.user.data.uid);
    }
  }

  addToWatched = (record) => {
    this.props.addToWatched(record.metadata.id, this.props.user.data.uid);
  }

  removeFromWatched = (record) => {
    this.props.removeFromWatched(record.metadata.id, this.props.user.data.uid);
  }

  goToMediaPage = (media) => {
		if (media.type === 'movie') {
			this.props.goToMoviePage(media.metadata.id);
		} else if (media.type === 'tv') {
			this.props.goToTVSeriesPage(media.metadata.id);
		}
	}

  render() {
    var columns = [
      {
        dataIndex: 'poster_path',
        key: 'poster_path',
        width: '10%',
        render: (text, record) => (<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${record.metadata.poster_path}`} alt="" height="100" width="67"/>)
      }, {
        title: 'Title',
        dataIndex: 'metadata.title',
        key: 'title',
        width: '30%',
        render: (text, record) => (<a onClick={() => this.goToMediaPage(record)} className="nav-link">{record.metadata.title}</a>)
      }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        render: (text) => <p className={`binger-capitalize ${text === 'movie'? `binger-blue`: `binger-lime`}`}>{text}</p>
      }, {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        width: '25%',
        render: (text, record) => (
          <div className="row binger-flex-center">
          {
            record.tags && Object.keys(record.tags).map(item => {
              return <Tag
                text={record.tags[item].text}
                color={record.tags[item].color} 
              />
            })
          }
          </div>
        )
      }, {
        key: 'actionButtons',
        width: '15%',
        render: (text, record) => (
          <div className="row">
            <Button 
              onButtonClick={() => record.type === 'movie' ? this.props.removeMovieFromWishlist(record.metadata.id, this.props.user.data.uid) : this.props.removeTVSeriesFromWishlist(record.metadata.id, this.props.user.data.uid)}
              className="mr-4 binger-btn-red"
              expandTextOnHover={true}
              icon="times" />
            {record.type === 'movie' && record.is_watched === '1' ?
              <Button 
              show={record.type === 'movie'}
              className="mr-4 binger-btn-green"
              onButtonClick={() => this.removeFromWatched(record)}
              icon="eye"/> : 
              <Button 
              show={record.type === 'movie'}
              className="mr-4 binger-btn-blue"
              onButtonClick={() => this.addToWatched(record)}
              icon="eye-slash"/>
            }
          </div>
        )
      }
    ]

    return (
			<div className="container binger-main-container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Card>
              <CardHeader>
                <div className="row binger-flex-center">
                  <span className="binger-text-strong binger-card-title">
                    Wishlist
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <Table 
                    columns={columns}
                    dataSource={this.props.user.fullWishlist}
                    stripped
                    numbered
                  />
              </CardBody>
            </Card>
          </div>
        </div>
			</div>
    )
  }
}

const mapDispatchToProps = {
  getFullWishlist: userActions.getFullWishlist,
  addToWatched: userActions.addToWatched,
  removeFromWatched: userActions.removeFromWatched,
  removeMovieFromWishlist: userActions.removeMovieFromWishlist,
  removeTVSeriesFromWishlist: userActions.removeTVSeriesFromWishlist,
  goToMoviePage: (id) => dispatch => dispatch(push(`/movie/${id}`)),
	goToTVSeriesPage: (id) => dispatch => dispatch(push(`/tv/${id}`)),
};

function mapStateToProps(state) {
  return {
    user: state.user,
    tvseries: state.tvseries,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
