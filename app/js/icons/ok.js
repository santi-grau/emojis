var Icon = require('./../views/icon');

var Ok = function( ){
	Icon.apply(this, arguments);

	setTimeout( this.blink.bind(this ), Math.random() * 2000 + 1000 );

	this.down = false;
	
	this.intervalTime = 5000;
	
	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	this.leftEye._matrix.manual = true;
	this.leftEye._matrix.identity().translate( this.leftEye.translation.x, this.leftEye.translation.y ).rotate(this.leftEye.rotation).scale(1, 1);

	this.rightEye._matrix.manual = true;
	this.rightEye._matrix.identity().translate( this.rightEye.translation.x, this.rightEye.translation.y ).rotate(this.rightEye.rotation).scale(1, 1);

	this.eyeScale = 1;

	this.timeCount = 0;
	this.timeSpeed = 0.01;

}

Ok.prototype = Object.create(Icon.prototype);
Ok.prototype.constructor = Ok;

Ok.prototype.blink = function(){
	this.leftEye.scale = 0.5;

	TweenMax.to(this, 0.1, { ease: Power2.easeOut, eyeScale: 0.1, yoyo : true, repeat : 3 });
	setTimeout( this.blink.bind(this ), Math.random() * this.intervalTime + this.intervalTime / 2 );
}

Ok.prototype.onMouseDown = function( ){
	this.down = true;
}
Ok.prototype.onMouseUp = function( ){
	this.down = false;
}

Ok.prototype.step = function( time ){

	this.timeCount += this.timeSpeed;

	this.leftEye._matrix.identity().translate( this.leftEye.translation.x, this.leftEye.translation.y ).rotate(this.leftEye.rotation).scale(1, this.eyeScale);
	this.rightEye._matrix.identity().translate( this.rightEye.translation.x, this.rightEye.translation.y ).rotate(this.rightEye.rotation).scale(1, this.eyeScale);

}

module.exports = Ok;