var Icon = require('./../views/icon');

var Good = function( ){
	Icon.apply(this, arguments);

	setTimeout( this.blink.bind(this ), Math.random() * 2000 + 1000 );

	this.down = false;
	
	this.intervalTime = 5000;

	var children = this.two.scene.children.slice();

	this.pinGroup = this.two.makeGroup( children );
	this.rotationGroup = this.two.makeGroup( this.pinGroup );
	this.rotationGroup.translation.set( this.parent.size.width / 2, this.parent.size.height / 2 + 75 );
	this.pinGroup.translation.set( -this.parent.size.width / 2, -this.parent.size.height / 2 - 75 );

	this.leftEye._matrix.manual = true;
	this.leftEye._matrix.identity().translate( this.leftEye.translation.x, this.leftEye.translation.y ).rotate(this.leftEye.rotation).scale(1, 1);

	this.rightEye._matrix.manual = true;
	this.rightEye._matrix.identity().translate( this.rightEye.translation.x, this.rightEye.translation.y ).rotate(this.rightEye.rotation).scale(1, 1);

	this.eyeScale = 1;

	this.timeCount = 0;
	this.timeSpeed = 0.02;

	var engine = Matter.Engine.create();
	var render = Matter.Render.create({
		element: this.element,
		engine: engine,
		options : {
			width: this.parent.size.width,
			height: this.parent.size.height
		}
	   
	});
	engine.world.gravity.x = 0
	engine.world.gravity.y = 0

	this.boxA = Matter.Bodies.circle( this.parent.size.width / 2, this.parent.size.height * 0.25 , 5, { restitution: 0.9, mass : 0.5, collisionFilter: {category: undefined} } );
	this.boxB = Matter.Bodies.circle( this.parent.size.width / 2, this.parent.size.height * 0.25 , 5, { isStatic: true, restitution: 0.9, mass : 0.5, collisionFilter: {category: undefined} } );
	
	Matter.World.add(engine.world, Matter.Constraint.create({bodyA: this.boxA, pointA: { x: 0, y: 0 }, bodyB: this.boxB, pointB: { x: 0, y: 0 }, stiffness: .03, render: { strokeWidth : .01, strokeStyle:'#00ffff'}}));

	Matter.World.add( engine.world, [ this.boxA, this.boxB ] );
	Matter.Engine.run(engine);
	// Matter.Render.run(render);

	this.pull = 0;
}

Good.prototype = Object.create(Icon.prototype);
Good.prototype.constructor = Good;

Good.prototype.blink = function(){
	this.leftEye.scale = 0.5;

	TweenMax.to(this, 0.2, { ease: Power2.easeOut, eyeScale: 0.1, yoyo : true, repeat : 1 });
	setTimeout( this.blink.bind(this ), Math.random() * this.intervalTime + this.intervalTime / 2 );
}

Good.prototype.onMouseDown = function( ){
	this.down = true;
}
Good.prototype.onMouseUp = function( ){
	this.down = false;
}

Good.prototype.step = function( time ){
	// if( this.down ) this.pull = Math.min( 0.01, this.pull + 0.001 );
	// else this.pull = 0;

	// Matter.Body.applyForce(this.boxA, this.boxB.position, { x : -this.pull, y : 0 } );

	this.timeCount += this.timeSpeed;

	this.leftEye._matrix.identity().translate( this.leftEye.translation.x, this.leftEye.translation.y ).rotate(this.leftEye.rotation).scale(1, this.eyeScale);
	this.rightEye._matrix.identity().translate( this.rightEye.translation.x, this.rightEye.translation.y ).rotate(this.rightEye.rotation).scale(1, this.eyeScale);
	// console.log(this.boxA.position.x- this.parent.size.width / 2)
	this.rotationGroup.rotation = Math.sin( this.timeCount * Math.PI / 2 ) * 0.1;
	// this.rotationGroup.rotation = Math.sin( (this.boxA.position.x - this.parent.size.width / 2) / 53 * Math.PI / 2 ) * 0.1;
}

module.exports = Good;