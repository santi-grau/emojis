var Icon = require('./../views/icon');

var Point = function( ){
	Icon.apply(this, arguments);

	this.down = false;
	
	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	this.timeCount = 0;
	this.timeSpeed = 0.001;

	this.noise = new SimplexNoise( Math.random );

	// console.log( this.hand.vertices );
	// this.hand.translation.set(100,0)
}

Point.prototype = Object.create(Icon.prototype);
Point.prototype.constructor = Point;

Point.prototype.step = function( time ){

	this.timeCount += this.timeSpeed;


	var n1 = this.noise.noise2D( this.timeCount, 0 ) * 30;
	var n2 = this.noise.noise2D( 0, this.timeCount ) * 30;
	this.hand.translation.set( n1 ,  n2 );

}

module.exports = Point;