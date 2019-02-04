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
			"background" : images.backgroundTileset.tileSize,
			"backgroundObjects" : images.backgroundObjectsTileset.tileSize,
			"effects" : images.effectsTileset.tileSize,
			"characters" : images.charactersTileset.tileSize,
			"ui" : images.uiTileset.tileSize
		}

		//canvas context 2d;
		this.ctxBackground = this.canvasBackgroundLayer.getContext( "2d" );
		this.ctxBackgroundObjects = this.canvasBackgroundObjectLayer.getContext( "2d" );
		this.ctxEffects = this.canvasEffectsLayer.getContext( "2d" );
		this.ctxCharacters = this.canvasCharactersLayer.getContext( "2d" );
		this.ctxUi = this.canvasUiLayer.getContext( "2d" );

		this.storeTileDataToContainer( images );
		this.prepareGraphics();
	};

	GraphicsManager.prototype.prepareGraphics = function(){
		
		var graphicsIndex;
	};

	GraphicsManager.prototype.drawTileMap = function( grid, height, width, tileSize){
		//TODO: draw tiles on tilemap from tiledata.
		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++){
				var y = i * tileSize;
				var x = j;
				var index = y + x;
				var tile = grid[ index ];
				var image = this.findImageForTile( tile );

			}
		}
	};

	GraphicsManager.prototype.storeTileDataToContainer = function( images ){
		this.backgroundTileData = new Object();
		this.backgroundObjectTileData = new Object();
		this.effectsTileData = new Object();
		this.charactersTileData = new Object();
		this.uiTileData = new Object();
		var container;
		var tileConfigContainer;
		var doStore = false;
		for( var key in images ){
			if( key === "backgroundTileset" ){
				container = this.backgroundTileData;
				tileConfigContainer = images.backgroundTileset.backgroundTileData;
				doStore = true;
			}else if( key === "backgroundObjectsTileset" ){
				container = this.backgroundObjectTileData;
				tileConfigContainer = images.backgroundObjectsTileset.backgroundObjectTileData;
				doStore = true;
			}else if( key === "effectsTileset" ){
				container = this.effectsTileData;
				tileConfigContainer = images.effectsTileset.effectsTileData;
				doStore = true;
			}else if( key === "charactersTileset" ){
				container = this.charactersTileData;
				tileConfigContainer = images.charactersTileset.charactersTileData;
				doStore = true;
			}else if( key === "uiTileset" ){
				container = this.uiTileData;
				tileConfigContainer = images.uiTileset.uiTileData;
				doStore = true;
			}else{
				doStore = false;
			}

			if( doStore ){
				for( var num in tileConfigContainer ){
					container[ num ] = tileConfigContainer[ num ];
				}
				doStore = false;
			}
			
		}
		
	};

	GraphicsManager.prototype.drawImageToCanvas = function( image, canvas ){ //image like { x, y, width, height, sizeX, sizeY, coordX, coordY }

	};

	GraphicsManager.prototype.findCanvasContextForObject = function( obj ){
		var ctx;

		return ctx;
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
	GraphicsManager.prototype.findImageForTile = function( tile ){
		var image;

		return image;
	};
	return GraphicsManager;
}());