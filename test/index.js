var express = require('express');
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

var fs = require('fs'),
	path = require('path');
var cache = {};
var sections = fs.readdirSync(__dirname + '/feature');

sections.forEach(function(section) {
	var features = fs.readdirSync(__dirname + '/feature/' + section);

	cache[section] = [];
	features.forEach(function(feature) {
		cache[section].push({
			name: path.basename(feature, '.html'),
			html: fs.readFileSync(__dirname + '/feature/' + section + '/' + feature).toString()
		});
	});
})

app.get('/theme.css', function(req, res) {
	//compile less here?
	fs.createReadStream(__dirname + '/../dist/theme.css')
		.pipe(res);
});

// serve static content
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index', {
		sections: cache
	});
});

var server = app.listen(9000, function() {
	console.log('Listening on port %d', server.address().port);
});