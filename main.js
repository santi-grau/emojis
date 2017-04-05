// ┌────────────────────────────────────────────────────────────────────┐
// | Filename: main.js
// └────────────────────────────────────────────────────────────────────┘

// ┌────────────────────────────────────────────────────────────────────┐
// | Require modules
// └────────────────────────────────────────────────────────────────────┘
var browserify = require('browserify-middleware');
var stringify = require('stringify');
var figlet = require('figlet');
var express = require("express");
var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');
var pckg = require('./package.json');
var jade = require('jade');

// ┌────────────────────────────────────────────────────────────────────┐
// | Initialize vars + constants
// └────────────────────────────────────────────────────────────────────┘
var app = express();
var port = Number(process.env.PORT || 5000);

// ┌────────────────────────────────────────────────────────────────────┐
// | App setup
// └────────────────────────────────────────────────────────────────────┘

browserify.settings({ transform: [stringify(['.glsl', '.obj', '.svg'])]});

app.set('views', __dirname + '/app/views');
app.use('/js', browserify('./app/js'));
app.set('view engine', 'jade');
app.use('/*.css', function(req, res){
	var reqUrl = req.originalUrl.split('/');
	var file = reqUrl[reqUrl.length-1].slice(0, -4);
	res.set('Content-Type', 'text/css').send( stylus.render( fs.readFileSync(__dirname + '/app/css/' + file + '.styl', 'utf-8') )); 
});

app.use(express.static(__dirname + '/app'));
// ┌────────────────────────────────────────────────────────────────────┐
// | Routes
// └────────────────────────────────────────────────────────────────────┘

app.get('/:view?', function(req, res){

	var icons = fs.readdirSync('./app/icons');
	var data = {};
	for( var i = 0 ; i < icons.length ; i++ ){
		if( icons[ i ].split('.').pop() == 'svg' ){
			data[ icons[ i ].split( '.' )[ 0 ].toLowerCase() ] = fs.readFileSync('./app/icons/' + icons[ i ].split('.')[0] + '.svg', { encoding : 'utf8' } );
		}
	}
	fs.writeFileSync('./app/icons/icons.json', JSON.stringify( data ) );

	var files = fs.readdirSync( './app/views' ).filter(/./.test.bind( new RegExp( new Array('.jade').join( "|" ) ) ) );
	var view = req.params.view;
	if(view == undefined) res.render( 'main', { title: pckg.name, files : files } );
	else res.render( view, { title: pckg.name + ' - ' + view.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) } );
});





// ┌────────────────────────────────────────────────────────────────────┐
// | Init!!
// └────────────────────────────────────────────────────────────────────┘
app.listen(port);

figlet.fonts(function(err, fonts) {
	var font = fonts[Math.floor(Math.random() * fonts.length)];
	figlet(pckg.name, { font : font},function(err, data) {
		console.log(data);
		console.log('└─────> ' + pckg.description);
		console.log('└─────> v ' + pckg.version);
		console.log('└─────> Listening on port: ' + port);
	});
});