var Icon = function(){
	this.inc = 0;
	this.noise = new SimplexNoise( Math.random );
}

Icon.prototype.init = function( two ) {
	this.scene = two.scene;
	this.vertices = this.scene.children[0].children[0].children[0].children[0].vertices;

	var iconDimensions = { width : parseInt( two.width ), height : parseInt( two.height ) };
	for( var i = 0 ; i < this.vertices.length ; i++ ){
		this.vertices[i].ox = this.vertices[ i ].x;
		this.vertices[i].oy = this.vertices[ i ].y;
		this.vertices[i].gr = ( iconDimensions.width / 2 - this.vertices[ i ].x < 0 ) ? 0 : 1;
	}

};

Icon.prototype.step = function( time ) {

	this.inc += 0.005;

	for( var i = 0 ; i < this.vertices.length ; i++ ){
		var n = this.inc;
		if( this.vertices[i].gr == 0 ) this.vertices[i].set( this.vertices[i].ox, this.vertices[i].oy - Math.sin( Math.PI * 2 * n ) * 2 );
		else this.vertices[i].set( this.vertices[i].ox, this.vertices[i].oy + Math.sin( Math.PI * 2 * n ) * 2 );
	}
}

module.exports = Icon;