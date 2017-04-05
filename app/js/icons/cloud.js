var Icon = function(){
	this.inc = 0;
	this.noise = new SimplexNoise( Math.random );
}

Icon.prototype.init = function( two ) {
	this.scene = two.scene;
	this.clouds = [];
	this.rainDrops = [];
	for( var i = 0 ; i < this.scene.children[0].children[0].children[0].children.length ; i++ ){
		var shape = this.scene.children[0].children[0].children[0].children[i];
		if( shape.id.indexOf('cloud') !== -1 ) this.clouds.push( shape );
		if( shape.id.indexOf('drop') !== -1 ) this.rainDrops.push( shape );
	}

	for( var i = 0 ; i < this.clouds.length ; i++ ) this.clouds[i].p = { x : this.clouds[i].vertices[0].x, y : this.clouds[i].vertices[0].y };
}

Icon.prototype.step = function( time ) {

	this.inc += 0.005;

	for( var i = 0 ; i < this.clouds.length ; i++ ){
		var n = this.noise.noise2D( this.clouds[i].p.x + this.inc, this.clouds[i].p.y );
		this.clouds[i].translation.set( n ,  n );
	}
}

module.exports = Icon;