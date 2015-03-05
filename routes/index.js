var request = require('request');

routes = {};

routes.home = function(req, res) {
	var r = {
		url: 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists?limit=50&offset=0',
		type: 'GET',
		headers: {
		    'Authorization' : 'Bearer ' + req.user.accessToken
		}
	};

	request(r, function(error, response, body) {
		var hbsData = JSON.parse(body).items;
		res.render('playlists', hbsData);
	});
};

routes.play = function(req, res) {
	res.render('player', {
		playlistId: req.params.id,
		userId: req.user.id
	});
}

routes.showLogin = function(req, res) {
	res.render('login');
};

routes.doLogin = function(req, res) {
	res.redirect('/');
};

routes.getAuthInfo = function(req, res) {
	res.json({
		token: req.user.accessToken,
		userid: req.user.id
	});
}

module.exports = routes;