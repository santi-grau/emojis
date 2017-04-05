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
		this.vertices[i].a = Math.atan2( this.vertices[ i ].y - iconDimensions.height / 2, this.vertices[ i ].x - iconDimensions.width / 2);
		this.vertices[i].d = Math.sqrt( Math.pow( this.vertices[ i ].x - iconDimensions.width / 2, 2 ) + Math.pow( this.vertices[ i ].y - iconDimensions.height / 2, 2 ) );
	}
};

Icon.prototype.step = function( time ) {

	this.inc += 0.005;

	for( var i = 0 ; i < this.vertices.length ; i++ ){
		var n = this.noise.noise2D( this.vertices[i].ox + this.inc, this.vertices[i].oy );
		this.vertices[i].set( this.vertices[i].ox + Math.cos( this.vertices[i].a ) * n * 3, this.vertices[i].oy + Math.sin( this.vertices[i].a ) * n * 3 );
	}
}

module.exports = Icon;