var Icon = require('./../views/icon');

var Pin = function( ){
	Icon.apply(this, arguments);

	this.pinHeight = 75;
	this.startPosition = this.parent.size.height / 2 + this.pinHeight / 2 - this.pinHeight / 2;
	this.down = false;
	

	var children = this.two.scene.children.slice();

	this.pinGroup = this.two.makeGroup( children );

	this.vTranslation = 0;
	// module aliases
	// var Render = Matter.Render;

	// create an engine
	var engine = Matter.Engine.create();

	
	var render = Matter.Render.create({
	    element: this.element,
	    engine: engine,
	    options : {
	    	width: this.parent.size.width,
	    	height: this.parent.size.height
	    }
	   
	});

	engine.world.gravity.y = 2

	// console.log(this.pinGroup.children)
	setTimeout( this.autoPlay.bind(this), 8000 + Math.random() * 8000 );
	
	this.boxB = Matter.Bodies.rectangle( this.parent.size.width / 2, this.startPosition, 50, this.pinHeight, { restitution: 0.9, mass : 0.5 });
	this.ground = Matter.Bodies.rectangle( this.parent.size.width / 2, this.parent.size.height / 2 + this.pinHeight / 2 + 5, 50, 10, { isStatic: true, restitution : 0.9 });

	Matter.World.add( engine.world, [ this.boxB, this.ground ] );
	Matter.Engine.run(engine);
	// Matter.Render.run(render);
}


Pin.prototype = Object.create(Icon.prototype);
Pin.prototype.constructor = Pin;


Pin.prototype.autoPlay = function(){
	Matter.Body.setVelocity( this.boxB, { x: 0, y: -10 });
	setTimeout( this.autoPlay.bind(this), 8000 + Math.random() * 8000 );
}

Pin.prototype.onMouseDown = function( ){
	this.down = true;
}
Pin.prototype.onMouseUp = function( ){
	this.down = false;
}


Pin.prototype.step = function( time ){
	if( !this.down && this.prevDown ) Matter.Body.setVelocity( this.boxB, { x: 0, y: -this.vTranslation });
	if( this.down ) this.vTranslation += ( 10 - this.vTranslation ) * 0.03;
	else this.vTranslation = 0;
	this.prevDown = this.down;
	this.pinTop.translation.set( 0, this.vTranslation * 2);

	this.pinGroup.translation.set( 0, this.boxB.position.y - this.startPosition );
}

module.exports = Pin;