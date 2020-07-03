// Urls to configuration and test Google and Facebook OAUTH //

//GOOGLE:
// https://console.developers.google.com/apis - Configuration Application (API Auth)
// https://developers.google.com/oauthplayground/ - Playground to access token without frontend

//FACEBOOK:
// https://developers.facebook.com/ - Configuration Application (AuthenticationOAuth)
// https://developers.facebook.com/tools/access_token - Playground to access token without frontend
// https://developers.facebook.com/tools/explorer - Playground to access token without frontend

module.exports = {
	JWT_SECRET: 'e8cbdcd5ffb6bf2fbeed2e072def14d6',
	MONGO_DB: {
		// const URI = 'mongodb://localhost/APIAuthentication
		MONGO_DB_URL_TEST:
			'mongodb+srv://Chris:Chris@cluster0-xxkhi.mongodb.net/APIAuthenticationTEST?retryWrites=true&w=majority',
		MONGO_DB_URL_DEV:
			'mongodb+srv://Chris:Chris@cluster0-xxkhi.mongodb.net/APIAuthenticationDEV?retryWrites=true&w=majority',
		MONGO_DB_URL_PRD:
			'mongodb+srv://Chris:Chris@cluster0-xxkhi.mongodb.net/APIAuthenticationPRD?retryWrites=true&w=majority',
	},
	OAUTH: {
		GOOGLE: {
			GOOGLE_CLIENT_ID_OAUTH:
				'236707709432-4jjh6teb0kgbu16juue89qvku2uv4sce.apps.googleusercontent.com',
			GOOGLE_CLIENT_SECRET_OAUTH: 'qVyrI6DtrdMZPVxFftSL9PwZ',
		},
		FACEBOOK: {
			FACEBOOK_CLIENT_ID_OAUTH: '275910096838383',
			FACEBOOK_CLIENT_SECRET_OAUTH: 'e29ead8b214ab7e9c87090e5505318a6',
		},
	},
};
