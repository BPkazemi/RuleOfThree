/* Module Dependencies */

var express = require('express'),
  routes = require('./routes'), // By default, node grabs ./routes/index.js
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/* Configuration */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views");
app.set('view engine', 'jade');

/* Middleware */
var auth = express.basicAuth(function(user, pass) {
	return user === 'babak' && pass === 'lorde';
});

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride()); // Allows using app.put and app.delete instead of app.post everywhere
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router); // faster to hit routes than hit disk! But there's trouble with MIME types (need to set to application/javascript)

// Modern alternative to app.configure('development', callback)
if( app.get('env') === 'development' ) {
	app.use(express.errorHandler()); // Responds to exceptions passed or caught from middleware above
}

/* Routes */

// Q - Why render anything? Shouldn't that all be done on the client-side?
//     Backing up a bit - node doesn't actually render any views, it only sets up a web server than can recognize requests and respond with data. Express, then, is a higher level abstraction of the same concept. In the end, res.render() does essentialy res.writeHead(contentTypeStuff), res.write(page), res.end(). It mostly just fetches data, and the browser does the actual rendering.
// 	     Q - Okay, what about res.render('error', {error: err})?
// Q - How does angular get access to its controllers? Because angular parses the entire document at least once before continuing?
// Q - What is the point of having Angular routes AND express routes?
// Q - How does Express set the views directory for Angular? Would it be app.set('views', __dirname + '/views')
app.get('/', auth, routes.index);
app.get('/partials/:name', routes.partials);

// API
app.get('/answers/:id', api.getAnswer);
app.get('/answers', api.getAllAnswers);
app.post('/addAnswer', api.addAnswer);

app.get('*', routes.index);

// The first part is equivalent to app.listen(app.get('port')) [delete this later]
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});