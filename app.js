var express = require('express');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var auth = require('./auth');
var routes = require('./routes/index.js');

var app = express();
app.use(express.static(__dirname + '/public'))
   .use(cookieParser())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(session({
		secret: 'secret string',
		resave: false,
		saveUninitialized: true
	}))
   .use(passport.initialize())
   .use(passport.session())
   .engine('handlebars', exphbs({defaultLayout: 'main'}))
   .set('view engine', 'handlebars');


/* ROUTES */
// ...main functionality
app.get('/', ensureAuthenticated, routes.home);
app.get('/playlist/:id', routes.play);

// ...auth
app.get('/login', routes.showLogin)
app.post('/auth/spotify', passport.authenticate('spotify'));
app.get('/auth/spotify/authInfo', routes.getAuthInfo);
app.get('/auth/spotify/callback', 
	passport.authenticate('spotify', { failureRedirect: '/login' }), 
	routes.doLogin
);


app.listen(3000);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}