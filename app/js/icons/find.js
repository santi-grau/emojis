var Icon = require('./../views/icon');

var Find = function( ){
	Icon.apply(this, arguments);

	this.down = false;
	
	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	setTimeout( this.autoPlay.bind(this), 6000 + Math.random() * 6000 );

	this.elements = [ this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.x ];
	this.animateSequence = 0;
}

Find.prototype = Object.create(Icon.prototype);
Find.prototype.constructor = Find;

Find.prototype.autoPlay = function( ){
	for( var i = 0 ; i < this.elements.length ; i++ ) this.elements[i].opacity = 0;
	this.animateSequence = 0;
	TweenMax.to(this, 0.7, { ease: Power0.easeNone, animateSequence: 0.1 });
	setTimeout( this.autoPlay.bind(this), 6000 + Math.random() * 6000 );
}

Find.prototype.onMouseDown = function( ){
	this.down = true;
}
Find.prototype.onMouseUp = function( ){
	this.down = false;
}

Find.prototype.step = function( time ){
	var id = Math.floor( ( ( this.elements.length - 1 ) * this.animateSequence ) * 10 );
	this.elements[id].opacity = 1;
}

module.exports = Find;