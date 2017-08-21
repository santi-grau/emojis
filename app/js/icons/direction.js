var Icon = require('./../views/icon');

var Direction = function( ){
	Icon.apply(this, arguments);

	this.rotation = 0;
	this.rotationGroup = this.two.makeGroup( this.arrow );

	this.rotationGroup.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 );
	this.arrow.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 );

	setTimeout( this.spin.bind(this), 2000 + Math.random() * 2000 );
}

Direction.prototype = Object.create(Icon.prototype);
Direction.prototype.constructor = Direction;

Direction.prototype.spin = function( ){
	TweenLite.to(this, 6, { ease: Elastic.easeOut.config(1, 0.3), rotation: Math.random() * 3 * Math.PI });
	setTimeout( this.spin.bind(this), 8000 + Math.random() * 8000 );
}

Direction.prototype.step = function( time ){
	this.rotationGroup.rotation = this.rotation;
}

module.exports = Direction;