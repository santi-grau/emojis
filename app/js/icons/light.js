var Icon = require('./../views/icon');

var Light = function( ){
	Icon.apply(this, arguments);

	this.down = false;
	
	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	this.noise = new SimplexNoise( Math.random );

	this.vertices = this.sun.vertices;
	
	for( var i = 0 ; i < this.vertices.length ; i++ ){
		this.vertices[i].ox = this.vertices[ i ].x;
		this.vertices[i].oy = this.vertices[ i ].y;
		this.vertices[i].a = Math.atan2( this.vertices[ i ].y - this.parent.size.height / 2, this.vertices[ i ].x - this.parent.size.width / 2);
		this.vertices[i].d = Math.sqrt( Math.pow( this.vertices[ i ].x - this.parent.size.width / 2, 2 ) + Math.pow( this.vertices[ i ].y - this.parent.size.height / 2, 2 ) );
	}

	this.timeCount = 0;
	this.timeSpeed = 0.015;

}

Light.prototype = Object.create(Icon.prototype);
Light.prototype.constructor = Light;

Light.prototype.onMouseDown = function( ){
	this.down = true;
}
Light.prototype.onMouseUp = function( ){
	this.down = false;
}

Light.prototype.step = function( time ){

	this.timeCount += this.timeSpeed;

	for( var i = 0 ; i < this.vertices.length ; i++ ){
		var n = this.noise.noise2D( this.vertices[i].ox + this.timeCount, this.vertices[i].oy ) * 3;
		this.vertices[i].set( this.vertices[i].ox + Math.cos( this.vertices[i].a ) * n, this.vertices[i].oy + Math.sin( this.vertices[i].a ) * n );
	}

}

module.exports = Light;