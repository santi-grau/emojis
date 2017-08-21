var Icon = function( parent, id, data ){
	this.parent = parent;
	this.id = id;
	// this.name = this.getName( data );

	this.element = document.createElement('div');
	this.element.setAttribute('class', 'square');
	this.parent.element.appendChild( this.element );

	this.element.addEventListener( 'mousedown', this.mousedown.bind(this) );
	this.element.addEventListener( 'mouseup', this.mouseup.bind(this) );

	var params = { width: this.parent.size.width, height: this.parent.size.height, autostart : true };
	this.two = new Two( params ).appendTo( this.element );

	this.two.renderer.domElement.style['transform'] = 'scale(' + this.element.offsetWidth / this.parent.size.width + ')';
	this.two.renderer.domElement.style['transformOrigin'] = '0 0';

	var elements = data.children;
	this.elements = {};

	for( var i = 0 ; i < elements.length ; i++ ){
		var name = elements[ i ].getAttribute('id');
		var nameClean = name.replace(/_\d+_/g, '');
		this[ nameClean ] = this.two.interpret( elements[ i ] );
	}
}

Icon.prototype.mousedown = function(){
	if( this.onMouseDown ) this.onMouseDown();
}

Icon.prototype.mouseup = function(){
	if( this.onMouseUp ) this.onMouseUp();
}

module.exports = Icon;