var Icon = require('./../views/icon');

var Love = function( ){
	Icon.apply(this, arguments);

	this.down = false;
	
	this.scaleGroup = this.two.makeGroup( this.heart );
	this.scaleGroup.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 );
	this.heart.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 );

	this.textGroup = this.two.makeGroup( this.y, this.o, this.u );

	this.scale = 1;

	this.timeCount = 0;
	this.timeSpeed = 0.01;

	this.timeCount = 0;
	this.timeSpeed = 0.002;

	setTimeout( this.beat.bind(this), 8000 + Math.random() * 8000 );

}

Love.prototype = Object.create(Icon.prototype);
Love.prototype.constructor = Love;

Love.prototype.beat = function(){
	this.y.opacity = 0;
	this.o.opacity = 0;
	this.u.opacity = 0;
	setTimeout( function(){ this.y.opacity = 1; }.bind(this), 100 );
	setTimeout( function(){ this.o.opacity = 1; }.bind(this), 200 );
	setTimeout( function(){ this.u.opacity = 1; }.bind(this), 300 );

	setTimeout( function(){ 
		this.y.opacity = 0;
		this.o.opacity = 0;
		this.u.opacity = 0;
	}.bind(this), 400 );

	setTimeout( function(){ this.y.opacity = 1; }.bind(this), 500 );
	setTimeout( function(){ this.o.opacity = 1; }.bind(this), 600 );
	setTimeout( function(){ this.u.opacity = 1; }.bind(this), 700 );

	setTimeout( this.beat.bind(this), 8000 + Math.random() * 8000 );
}

Love.prototype.onMouseDown = function( ){
	this.down = true;
}
Love.prototype.onMouseUp = function( ){
	this.down = false;
}

Love.prototype.step = function( time ){

	this.timeCount += this.timeSpeed;

	
	var s = 1.04 + Math.sin( this.timeCount * Math.PI * 2 ) * 0.04;
	this.scale = s;

	this.scaleGroup.scale = this.scale;

	this.timeCount += this.timeSpeed;

}

module.exports = Love;