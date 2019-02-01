var GraphicsManager = (function(){
	function GraphicsManager( newParent, canvasLayers, images ){
	//public

		this.parent = newParent;

		//canvas layers;
		this.canvasBackgroundLayer = canvasLayers.backgroundLayer;
		this.canvasBackgroundObjectLayer = canvasLayers.backgroundObjectsLayer;
		this.canvasEffectsLayer = canvasLayers.effectsLayer;
		this.canvasCharactersLayer = canvasLayers.charactersLayer;
		this.canvasUiLayer = canvasLayers.uiLayer;

		//Tilesets for canvas layers;
		this.backgroundTileset = new Image();
		this.backgroundTileset.src = images.backgroundTileset.src;
		this.backgroundObjectsTileset = new Image();
		this.backgroundObjectsTileset.src = images.backgroundObjectsTileset.src;
		this.effectsTileset = new Image();
		this.effectsTileset.src = images.effectsTileset.src;
		this.charactersTileset = new Image();
		this.charactersTileset.src = images.charactersTileset.src;
		this.uiTileset = new Image();
		this.uiTileset.src = images.uiTileset.src;

		this.tileSize = {
			"background" : backgroundTileset.tileSize,
			"backgroundObjects" : backgroundObjectsTileset.tileSize,
			"effects" : effectsTileset.tileSize,
			"characters" : charactersTileset.tileSize,
			"ui" : uiTileset.tileSize
		}

		//canvas context 2d;
		this.ctxBackground = canvasBackgroundLayer.getContext( "2d" );
		this.ctxBackgroundObjects = canvasBackgroundObjectLayer.getContext( "2d" );
		this.ctxEffects = canvasEffectsLayer.getContext( "2d" );
		this.ctxCharacters = canvasCharactersLayer.getContext( "2d" );
		this.ctxUi = canvasUiLayer.getContext( "2d" );

		this.prepareGraphics();
	};

	GraphicsManager.prototype.prepareGraphics = function(){
		this.backgroundTileData = {
			"earth" : [ { "x": 0, "y": 0 } ],
			"grass" : [ { "x": 0, "y": 0 }, { "x": 0, "y": 0 } ],
			"rockyGround" : [ { "x": 0, "y": 0 } ]
		}
		this.backgroundObjectTileData;
		this.effectsTileData;
		this.charactersTileData = {
			"goblin" : [ { "x": 0, "y": 0}, { "x": 0, "y": 0 } ],
			"human" : [ { "x": 0, "y": 0 }, { "x": 0, "y": 0 }, { "x": 0, "y": 0 } ]
		}
		this.uiTileData;

		var graphicsIndex;




	};

	GraphicsManager.prototype.drawImagesOnCanvas = function(){
		//TODO: draw tiles on tile map from tiledata.
	};

	GraphicsManager.prototype.storeTileDataToContainer = function( container, tileData ){

	};
/*
	GraphicsManager.prototype.drawImageForCanvas = function(){
    	this.ctx.drawImage( this.backgroundTileset, 0, 0);
    	var imageWidth = 96;
    	var imageHeight = 96;
    	var tileWidth = 32;
    	var tileHeight = 32;
    	var tilesX = imageWidth / tileWidth;
		var tilesY = imageHeight / tileHeight;
		var totalTiles = tilesX * tilesY;        
		var tileData = new Array();
		for(var i=0; i<tilesY; i++)
		{
		    for(var j=0; j<tilesX; j++)
		    {           
		    // Store the image data of each tile in the array.
		    tileData.push(ctx.getImageData(j*tileWidth, i*tileHeight, tileWidth, tileHeight));
		    }
		 }
		//From here you should be able to draw your images back into a canvas like so:
		ctx.putImageData(tileData[0], x, y);
	};
*/	
	return GraphicsManager;
}());