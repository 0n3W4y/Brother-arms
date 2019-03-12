var Position = (function(){
	function Position( parent, params ){
		this.parent = parent;
		this.componentName = "position";
		this.updated = false;

		this.x = params.x;
		this.y = params.y;		
	};

	Position.prototype.getPosition = function(){
		return { "x": x, "y": y };
	};

	Position.prototype.setPosition = function( x, y ){
		this.x = x;
		this.y = y;
	};

	return Position;
}());