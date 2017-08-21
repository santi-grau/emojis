var Icon = require('./../views/icon');

var Nice = function( ){
	Icon.apply(this, arguments);

	console.log(this.path)

	this.letter.opacity = 0;
	this.dot.opacity = 1;

	this.path.subdivide();
	this.path.noFill();
	this.path.stroke = this.letter.fill;
	this.path.linewidth = 8;
	this.path.cap = 'round';
	this.path.join = 'round';

	this.currentVs = 0;
	this.totalDistance = 0;
	for( var i = 0 ; i < this.path.vertices.length ; i++ ){
		this.path.vertices[i].d = this.totalDistance;
		if( i < this.path.vertices.length - 1 ) this.totalDistance += this.path.vertices[i].distanceTo(this.path.vertices[i+1]);
	}

	
	this.t = 0;

	setTimeout( this.animate.bind(this), 2000 + Math.random() * 2000 );
}

Nice.prototype = Object.create(Icon.prototype);
Nice.prototype.constructor = Nice;


Nice.prototype.animate = function( time ){
	this.dot.opacity = 0;
	TweenMax.to( this, 3, { ease: Linear.easeNone, t: this.totalDistance });

	setTimeout( this.animate.bind(this), 6000 + Math.random() * 4000 );
}

Nice.prototype.step = function( time ){

	if( this.t > 230 ) this.dot.opacity += ( 1 - this.dot.opacity ) * 0.3;
	for( var i = 0 ; i < this.path.vertices.length ; i++ ){
		if( this.t > this.path.vertices[i].d ) this.path.ending = i / this.path.vertices.length;
	}
}

module.exports = Nice;