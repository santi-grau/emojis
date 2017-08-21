var Icon = require('./../views/icon');

var Orbit = function( ){
	Icon.apply(this, arguments);

	this.down = false;
	
	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	
	this.timeCount = 0;
	this.timeSpeed = 0.01;

	this.phase1 = Math.random();
	this.phase2 = Math.random();

	this.speed1 = 0.001 + Math.random() * 0.0004;
	this.speed2 = 0.001 + Math.random() * 0.0004;

	setTimeout( this.accelerate.bind(this), 6000 + Math.random() * 6000 );
}

Orbit.prototype = Object.create(Icon.prototype);
Orbit.prototype.constructor = Orbit;


Orbit.prototype.accelerate = function( ){
	TweenMax.to( this, 4, { ease: Expo.easeIn, speed1: 0.04 + Math.random() * 0.03, yoyo : true, repeat : 1, repeatDelay : 1, delay : Math.random() });
	TweenMax.to( this, 4, { ease: Expo.easeIn, speed2: 0.04 + Math.random() * 0.03, yoyo : true, repeat : 1, repeatDelay : 1, delay : Math.random() });
	setTimeout( this.accelerate.bind(this), 12000 + Math.random() * 12000 );
}

Orbit.prototype.onMouseDown = function( ){
	this.down = true;
}
Orbit.prototype.onMouseUp = function( ){
	this.down = false;
}

Orbit.prototype.step = function( time ){
	this.phase1 += this.speed1;
	this.phase2 += this.speed2;

	this.planet1.translation.set( this.parent.size.width / 2 + Math.cos( Math.PI * 2 * this.phase1 ) * this.orbit1.radius , this.parent.size.height / 2 + Math.sin( Math.PI * 2 * this.phase1 ) * this.orbit1.radius );
	this.planet2.translation.set( this.parent.size.width / 2 + Math.cos( Math.PI * 2 * this.phase2 ) * this.orbit2.radius , this.parent.size.height / 2 + Math.sin( Math.PI * 2 * this.phase2 ) * this.orbit2.radius );

	this.timeCount += this.timeSpeed;
}

module.exports = Orbit;