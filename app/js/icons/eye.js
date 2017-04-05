var Icon = function(){
	this.inc = 0;
	this.noise = new SimplexNoise( Math.random );
}

Icon.prototype.init = function( two ) {
	this.scene = two.scene;

	console.log(this.scene.children[0].children[0].children[0].children);

	this.shapes = {};
	for( var i = 0 ; i < this.scene.children[0].children[0].children[0].children.length ; i++ ){
		var shape = this.scene.children[0].children[0].children[0].children[i];
		if( shape.id.indexOf('back') !== -1 ) this.shapes.back = shape;
		if( shape.id.indexOf('pupil') !== -1 ) this.shapes.pupil = shape;
		if( shape.id.indexOf('iris') !== -1 ) this.shapes.iris = shape;
	}

	this.shapes.iris.fill = '#ffffff'
}

Icon.prototype.step = function( time ) {

	this.inc += 0.005;

	var n = this.noise.noise2D( 0 + this.inc, 0.5 ) * 3;
	this.shapes.iris.translation.set( n, 0 );
	this.shapes.pupil.translation.set( n * 1.1, 0 );
}

module.exports = Icon;