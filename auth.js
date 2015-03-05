var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new SpotifyStrategy({
		clientID: process.env.SPOTIFYID,
		clientSecret: process.env.SPOTIFYSECRET,
		callbackURL: process.env.SPOTIFYURI
	},
	function(accessToken, refreshToken, profile, done) {
		profile.accessToken = accessToken;
		process.nextTick(function () {
			return done(null, profile);
    	});
	}
));