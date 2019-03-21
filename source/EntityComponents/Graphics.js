var Graphics = (function(){
	function Graphics( parent, params ){
		this.parent = parent;
		this.componentName = "graphics";
		this.updated = false;

		this.graphicsX = params.x;
		this.graphicsY = params.y;
		this.layer = params.layer; // use canvas context;
		this.graphicIndex = params.graphicIndex;
		this.graphicIndexTileData = params.graphicIndexTileData;
		this.scaleX = params.scaleX || 1;
		this.scaleY = params.scaleY || 1;
		this.tileSizeX = params.tileSize.x;
		this.tileSizeY = params.tileSize.y;
	};

	Graphics.prototype.getPosition = function(){
		return { "x": this.graphicsX, "y": this.graphicsY };
	};

	Graphics.prototype.setPosition = function( x, y ){
		this.graphicsX = x;
		this.graphicsY = y;
	};

	Graphics.prototype.movePosition = function( x, y ){
		this.graphicsX += x;
		this.graphicsY += y;
	};

	Graphics.prototype.getConfigForGraphicsManager = function(){
		var config = {
			"imageX": this.graphicIndex.x,
			"imageY": this.graphicIndex.y,
			"tileSizeX": this.tileSizeX, 
			"tileSizeY": this.tileSizeY, 
			"x": this.graphicsX,
			"y": this.graphicsY,
			"scaleX": this.graphicIndex.x * this.scaleX,
			"scaleY": this.graphicIndex.y * this.scaleY,
			"ctx": this.layer,
			"tiledata": this.graphicIndexTileData
		};
		return config;
	};

	return Graphics;
}());