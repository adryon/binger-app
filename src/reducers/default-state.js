import lockr from 'lockr';
import config from 'lib/config';

lockr.prefix = config.LOCKR_PREFIX;

const hasToken = lockr.get('Authorization');

export default {
  user: {
    authenticated: !!hasToken,
    data: {},
    rolesConstants: {},
    tvSeriesWishlist: [],
    moviesWishlist: [],
    fullWishlist: [],
    fullFavorites: [],
    currentlyWatching: [],
  },
  tvseries: {
    searchData: [],
    viewTVSeriesDetails: null,
    viewTVSeriesCast: null,
  },
  movies: {
    searchData: [],
    viewMovieDetails: null,
    viewMovieCast: null,
  },
  app: {
    isFetching: false,
    searchData: [],
  }
};
