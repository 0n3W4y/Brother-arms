var Tile = (function() {
	function Tile( newId, newX, newY, params ){
	//public
		this.id = newId;
		this.x = newX; //grid
		this.y = newY;

		this.tileBiome = params.biome;
		this.tileType = params.tileType;
		this.tileCover = params.tileCover;
		this.tileEffect = params.tileEffect;
		this.walkable = params.walkable;
		this.speedRatio = params.speedRatio;

		//graphics config:
		this.graphicsX = null; // graphics grid;
		this.graphicsY = null;

		this.layer0 = null;
		this.graphicsIndexLayer0 = null; //type; earth
		this.tileSizeLayer0X = null;
		this.tileSizeLayer0Y = null;
		this.tileTypeGraphicIndex = null;

		this.layer1 = null;		
		this.graphicsIndexLayer1 = null; //cover; grass		
		this.tileSizeLayer1X = null;
		this.tileSizeLayer1Y = null;
		this.tileCoverGraphicIndex = null;	
		
		this.tileEffectGraphicIndex = null;

		//TODO: check parameters, put default, if 1 or more parameters n/a ;
		// log this in console, to see errors;
	};

	Tile.prototype.changeParams = function( params ){
		this.tileBiome = params.biome;
		this.tileType = params.tileType;
		this.tileCover = params.tileCover;
		this.tileEffect = params.tileEffect;
		this.walkable = params.walkable;
		this.speedRatio = params.speedRatio;
	}

	Tile.prototype.getParamsToGraphicsManager = function( layer ){
		var config;
		if( layer == "layer0" ){
			config = {
				"imageX": this.graphicsIndexLayer0.x,
				"imageY": this.graphicsIndexLayer0.y,
				"tileSizeX": this.tileSizeLayer0X, 
				"tileSizeY": this.tileSizeLayer0Y, 
				"x": this.graphicsX,
				"y": this.graphicsY,
				"scaleX": this.tileSizeLayer0X,
				"scaleY": this.tileSizeLayer0Y,
				"ctx": this.layer0,
				"tiledata": this.tileTypeGraphicIndex
			};
		}else if( layer == "layer1" ){
			config = {
				"imageX": this.graphicsIndexLayer1.x,
				"imageY": this.graphicsIndexLayer1.y, 
				"tileSizeX": this.tileSizeLayer1X,
				"tileSizeY": this.tileSizeLayer1Y,
				"x": this.graphicsX,
				"y": this.graphicsY,
				"scaleX": this.tileSizeLayer1X,
				"scaleY": this.tileSizeLayer1Y,
				"ctx": this.layer1,
				"tiledata": this.tileCoverGraphicIndex
			};
		};
		return config;
	};

	return Tile;

}());