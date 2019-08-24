import lockr from 'lockr';
import config from 'lib/config';
import {Map, List} from 'immutable';

lockr.prefix = config.LOCKR_PREFIX;

const hasToken = lockr.get('Authorization');

export default {
  user: {
    authenticated: !!hasToken,
    data: {},
    rolesConstants: {},
    isFetching: false,
    tvSeriesWishlist: [],
    moviesWishlist: [],
  },
  tvSeries: {
    searchData: {}
  },
  movies: {
    searchData: {},
    viewMovie: null,
  }
};
