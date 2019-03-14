var Graphics = (function(){
	function Graphics( parent, params ){
		this.parent = parent;
		this.componentName = "graphics";
		this.updated = false;

		this.graphicsX = params.x;
		this.graphicsY = params.y;
		this.layer = null; // use canvas context;
		this.graphicIndex = null;
	};

	Graphics.prototype.getPosition = function(){
		return { "x": this.graphicsX, "y": this.graphicsY };
	};

	Graphics.prototype.setPosition = function( x, y ){
		this.graphicsX = x;
		this.graphicsY = y;
	};

	Graphics.prototype.changePosition = function( x, y ){
		this.graphicsX += x;
		this.graphicsY += y;
	};

	return Graphics;
}());