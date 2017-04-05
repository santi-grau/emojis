window.SimplexNoise = require('simplex-noise');

var svgData = require('./../icons/icons.json');

var Sun = require('./icons/sun');
var Eye = require('./icons/eye');
var Travel = require('./icons/travel');
var Cloud = require('./icons/cloud');

var icons = {
	'sun' : new Sun(),
	'eye' : new Eye(),
	'travel' : new Travel(),
	'cloud' : new Cloud()
};

var elems = document.getElementsByClassName('content');
for (var icon in icons) {
	var parser = new DOMParser();
	var svg = parser.parseFromString( svgData[icon], "image/svg+xml");

	var main = document.getElementById('main');

	var square = document.createElement('div');
	square.setAttribute('class', 'square');
	main.appendChild( square );

	// var content = document.createElement('div');
	// content.setAttribute('class', 'content');
	// square.appendChild( content );

	var iconData = svgData[icon];
	var parser = new DOMParser();
	var doc = parser.parseFromString(iconData, "image/svg+xml");
	var iconWidth = parseInt( doc.childNodes[0].getAttribute('width') );

	var params = { width: iconWidth, height: iconWidth, autostart : true };
	var two = new Two( params ).appendTo( square );

	two.renderer.domElement.style['transform'] = 'scale(' + square.offsetWidth / iconWidth + ')';
	two.renderer.domElement.style['transformOrigin'] = '0 0';


	// var iconDimensions = { width : parseInt( doc.childNodes[0].getAttribute('width') ), height : parseInt( doc.childNodes[0].getAttribute('height') ) };
	var i = two.interpret(doc.childNodes[0]);

	i.fill = '#99999A'

	if( icons[icon].init ) icons[icon].init( two );

} 



// console.log(doc.childNodes[0].getAttribute('width'));



// console.log(i);

// i.translation = new Two.Vector(elem.offsetWidth / 2,elem.offsetHeight/2);

// i.center();

// two.update();

// var vertices = i.children[0].children[0].children[0].vertices;


// for( var i = 0 ; i < vertices.length ; i++ ){
// 	vertices[i].ox = vertices[ i ].x;
// 	vertices[i].oy = vertices[ i ].y;
// 	vertices[i].a = Math.atan2( vertices[ i ].y - iconDimensions.height / 2, vertices[ i ].x - iconDimensions.width / 2);
// 	vertices[i].d = Math.sqrt( Math.pow( vertices[ i ].x - iconDimensions.width / 2, 2 ) + Math.pow( vertices[ i ].y - iconDimensions.height / 2, 2 ) );
// }


var App = function() {

	window.onresize = this.onResize.bind( this );
	this.inc = 0;
	


	this.onResize();
	
	this.step();
}

App.prototype.onResize = function(e) {
	// var multiSample = 2;
	// this.renderer.setSize( this.containerEl.offsetWidth * multiSample, this.containerEl.offsetHeight * multiSample );
	// this.renderer.domElement.setAttribute( 'style', 'width:' + this.containerEl.offsetWidth + 'px; height:' + this.containerEl.offsetHeight + 'px' );
}

App.prototype.step = function( time ) {
	window.requestAnimationFrame( this.step.bind( this ) );

	for (var icon in icons) {
		if( icons[icon].step ) icons[icon].step( time );
	}
	// this.inc += 0.01;

	// for( var i = 0 ; i < vertices.length ; i++ ){
	// 	var n = this.noise.noise2D( vertices[i].ox + this.inc, vertices[i].oy );
	// 	vertices[i].set( vertices[i].ox + Math.cos( vertices[i].a ) * n * 3, vertices[i].oy + Math.sin( vertices[i].a ) * n * 3 );
	// }
	
	// if( this.material.uniforms.time ) this.material.uniforms.time.value += this.timeInc;

	// this.renderer.render( this.scene, this.camera );
};

var app = new App();