var Icon = require('./../views/icon');

var Storm = function( ){
	Icon.apply(this, arguments);

	this.noise = new SimplexNoise( Math.random );

	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	this.clouds = this.two.makeGroup();
	this.drops = this.two.makeGroup();

	this.timeCount = 0;
	this.timeSpeed = 0.005;

	for( var i = this.pinGroup.children.length - 1 ; i >= 0 ; i-- ){
		var shape = this.pinGroup.children[i];
		shape.p = { x : shape.vertices[0].x, y : shape.vertices[0].y };
		if( shape.id.indexOf('cloud') !== -1 ) this.clouds.add( shape );
		if( shape.id.indexOf('drop') !== -1 ) this.drops.add( shape );
	}
	this.down = false;

	console.log( this.drops.children );
	this.drops.children[0].opacity = 1;
	this.drops.children[0].position = -0.1;
	this.drops.children[1].opacity = 1;
	this.drops.children[1].position = -0.1;
	this.drops.children[2].opacity = 1;
	this.drops.children[2].position = -0.1;
	this.drops.children[3].opacity = 1;
	this.drops.children[3].position = -0.1;
	this.drops.children[4].opacity = 1;
	this.drops.children[4].position = -0.1;

	TweenMax.to( this.drops.children[0], 0.4, { ease: Power0.easeNone, opacity: 0, position : 1, repeat : Infinity, delay : Math.random() });
	TweenMax.to( this.drops.children[1], 0.4, { ease: Power0.easeNone, opacity: 0, position : 1, repeat : Infinity, delay : Math.random() });
	TweenMax.to( this.drops.children[2], 0.4, { ease: Power0.easeNone, opacity: 0, position : 1, repeat : Infinity, delay : Math.random() });
	TweenMax.to( this.drops.children[3], 0.4, { ease: Power0.easeNone, opacity: 0, position : 1, repeat : Infinity, delay : Math.random() });
	TweenMax.to( this.drops.children[4], 0.4, { ease: Power0.easeNone, opacity: 0, position : 1, repeat : Infinity, delay : Math.random() });
}

Storm.prototype = Object.create(Icon.prototype);
Storm.prototype.constructor = Storm;

Storm.prototype.step = function( time ){

	this.timeCount += this.timeSpeed;

	for( var i = 0 ; i < this.drops.children.length ; i++ ){
		var a = -4.31096;

		var p1 = Math.cos( a ) * this.drops.children[i].position * 30;
		var p2 = Math.sin( a ) * this.drops.children[i].position * 30;
		this.drops.children[i].translation.set( p1, p2 );
	}
	for( var i = 0 ; i < this.clouds.children.length ; i++ ){
		var n1 = this.noise.noise2D( this.clouds.children[i].p.x + this.timeCount, this.clouds.children[i].p.y ) * 3;
		var n2 = this.noise.noise2D( this.clouds.children[i].p.x, this.clouds.children[i].p.y + this.timeCount ) * 3;
		this.clouds.children[i].translation.set( n1 ,  n2 );
	}
}

module.exports = Storm;