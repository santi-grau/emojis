var Icon = require('./../views/icon');

var Simmer = function( ){
	Icon.apply(this, arguments);

	this.down = false;
	
	var children = this.two.scene.children.slice();
	this.pinGroup = this.two.makeGroup( children );

	
	this.timeCount = 0;
	this.timeSpeed = 0.005;

	this.smokeLeft = this.leftSmoke.getBoundingClientRect();
	var points = 20;
	var radius = 8;
	var smokeLeftVs = [];
	var px = this.smokeLeft.left + this.smokeLeft.width / 2;
	var py = this.smokeLeft.top + radius / 2;
	var pw = this.smokeLeft.width;
	var ph = this.smokeLeft.height - radius;
	for ( var i = 0 ; i < points ; i++ ){
		var anchor = smokeLeftVs.push( new Two.Anchor( px, py + ph / points * i ) );
		smokeLeftVs[i].p = { x : px, y : py + ph / points * i };
		smokeLeftVs[i].id = i;
	}

	this.leftPath = new Two.Path(smokeLeftVs, false, false, false);
	this.leftPath.stroke = this.leftSmoke.fill;
	this.leftPath.cap = 'round';
	this.leftPath.linewidth = radius;
	this.two.add( this.leftPath );

	this.leftSmoke.opacity = 0


	this.smokeRight = this.rightSmoke.getBoundingClientRect();
	var points = 20;
	var radius = 8;
	var smokeRightVs = [];
	var px = this.smokeRight.left + this.smokeRight.width / 2;
	var py = this.smokeRight.top + radius / 2;
	var pw = this.smokeRight.width;
	var ph = this.smokeRight.height - radius;
	for ( var i = 0 ; i < points ; i++ ){
		var anchor = smokeRightVs.push( new Two.Anchor( px, py + ph / points * i ) );
		smokeRightVs[i].p = { x : px, y : py + ph / points * i };
		smokeRightVs[i].id = i;
	}

	this.rightPath = new Two.Path(smokeRightVs, false, false, false);
	this.rightPath.stroke = this.rightSmoke.fill;
	this.rightPath.cap = 'round';
	this.rightPath.linewidth = radius;
	this.two.add( this.rightPath );

	this.rightSmoke.opacity = 0

}

Simmer.prototype = Object.create(Icon.prototype);
Simmer.prototype.constructor = Simmer;

Simmer.prototype.step = function( time ){

	this.timeCount += this.timeSpeed;

	var vs = this.leftPath.vertices;
	for( var i = 0 ; i < vs.length ; i++ ){
		vs[i].x = vs[i].p.x + Math.sin( Math.PI * 0.75 + Math.PI * 2 * this.timeCount + i / vs.length * Math.PI * 2.5 ) * 3;
	}

	var vs = this.rightPath.vertices;
	for( var i = 0 ; i < vs.length ; i++ ){
		vs[i].x = vs[i].p.x + Math.sin( Math.PI * 0.75 + Math.PI * 2 * this.timeCount + i / vs.length * Math.PI * 2.5 ) * 3;
	}

}

module.exports = Simmer;