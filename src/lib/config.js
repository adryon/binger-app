export default {
	API_URL: process.env.REACT_APP_API_URL || '/api',
	FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
	THE_MOVIE_DB_TOKEN: process.env.REACT_APP_THEMOVIE_DB_API_KEY,
	LOCKR_PREFIX: 'app.',
	colors: ["#1B5E20","#0D47A1","#B71C1C"],
	MOVIE_DB_PAYLOAD: {
		api_key: process.env.REACT_APP_THEMOVIE_DB_API_KEY,
    language: 'en-US',
	}
}
