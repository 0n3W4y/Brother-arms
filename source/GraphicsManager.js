var GraphicsManager = (function(){
	function GraphicsManager( newParent, canvasLayers, images, gridTileSize ){
	//public

		this.parent = newParent;
		this.gridTileSize = gridTileSize;

		//canvas layers;
		this.canvasBackgroundLayer = canvasLayers.backgroundLayer;
		this.canvasCoverLayer = canvasLayers.coverLayer;
		this.canvasForegroundObjectLayer = canvasLayers.foregroundObjectLayer;
		this.canvasEffectsLayer = canvasLayers.effectsLayer;
		this.canvasCharactersLayer = canvasLayers.charactersLayer;
		this.canvasUiLayer = canvasLayers.uiLayer;

		//Tilesets for canvas layers;
		this.backgroundTileset = new Image();
		this.backgroundTileset.src = images.backgroundTileset.src;
		this.coverTileset = new Image();
		this.coverTileset.src = images.coverTileset.src;
		this.effectsTileset = new Image();
		this.effectsTileset.src = images.effectsTileset.src;
		this.charactersTileset = new Image();
		this.charactersTileset.src = images.charactersTileset.src;
		this.uiTileset = new Image();
		this.uiTileset.src = images.uiTileset.src;

		//canvas context 2d;
		this.ctxBackground = this.canvasBackgroundLayer.getContext( "2d" );
		//this.ctxBackground.scale(0.25, 0.25);
		this.ctxCover = this.canvasCoverLayer.getContext( "2d" );
		this.ctxForegroundObjects = this.canvasForegroundObjectLayer.getContext( "2d" );
		this.ctxEffects = this.canvasEffectsLayer.getContext( "2d" );
		this.ctxCharacters = this.canvasCharactersLayer.getContext( "2d" );
		this.ctxUi = this.canvasUiLayer.getContext( "2d" );

		this.storeTileDataToContainer( images );
		this.prepareGraphics();
	};

	GraphicsManager.prototype.prepareGraphics = function(){
		
		var graphicsIndex;
	};

	GraphicsManager.prototype.drawTileMap = function( grid, height, width ){
		//function draw tilemap on layer0;
		//TODO: draw other layers on map, if needed;
		this.drawBackgroundTileMap( grid, height, width );
		//this.drawTileCover( grid );
		
	};

	GraphicsManager.prototype.drawBackgroundTileMap = function( grid, height, width ){

		// переделать
		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++){
				var index = i * height + j;
				var tile = grid[ index ];
				var imagesContainer = this.findImagesForTile( tile );
				var num = imagesContainer.coordinates.length;
				var randomIndex = Math.floor( Math.random() * ( num ) );
				tile.tileTypeGraphicIndex = randomIndex;
				var image = imagesContainer.coordinates[ randomIndex ];
				var x = j * this.gridTileSize;
				var y = i * this.gridTileSize;
				tile.graphicsX = x;
				tile.graphicsY = y;

				var imageConfig = { 
					"imageX": image.x,
					"imageY": image.y, 
					"tileSizeX": imagesContainer.tileSize.x, 
					"tileSizeY": imagesContainer.tileSize.y, 
					"x": x,
					"y": y,
					"scaleX": imagesContainer.tileSize.x,
					"scaleY": imagesContainer.tileSize.y
				};
				//Image: { x, y, tileSizeX, tileSizeY, coordsX, coordsY, scaleX, scaleY };
				this.drawImagesToCanvas( imageConfig, this.ctxBackground, this.backgroundTileset );

			};
		};
	}

	GraphicsManager.prototype.storeTileDataToContainer = function( images ){
		this.backgroundTileData = new Object();
		this.coverTileData = new Object();
		this.foregroundObjectTileData = new Object();
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
			}else if( key === "coverTileset" ){
				container = this.coverTileData;
				tileConfigContainer = images.coverTileset.coverTileData;
				doStore = true;
			}else if( key === "foregroundObjectsTileset" ){
				container = this.foregroundObjectTileData;
				tileConfigContainer = images.foregroundObjectsTileset.foregroundObjectTileData;
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
			};

			if( doStore ){
				for( var num in tileConfigContainer ){
					container[ num ] = tileConfigContainer[ num ];
				};
				doStore = false;
			};		
		};		
	};

	GraphicsManager.prototype.drawEntities = function( container ){
		var aliveContainer = container.alive;
		var objectsContainer = container.objects;
		//TODO: draw all in containers on canvases;
	};

	GraphicsManager.prototype.redrawLayer = function( layer ){

	};

	GraphicsManager.prototype.drawImagesToCanvas = function( image, canvas, tileData ){ 
		//Image: { x, y, tileSizeX, tileSizeY, coordsX, coordsY, scaleX, scaleY };
		canvas.drawImage( tileData, image.imageX, image.imageY, image.tileSizeX, image.tileSizeY, image.x, image.y, image.scaleX, image.scaleY );
		//TODO: check params from image and do errors;
	};

	GraphicsManager.prototype.findImageConfigForEntity = function( entity ){
		var image;

		return image;
	};

	GraphicsManager.prototype.getConfigForBackgroundTile = function( tile ){
		var tileBiome = tile.tileBiome;
		var tileType = tile.tileType;
		var tileCover = tile.tileCover;
		var tileX = tile.x;
		var tileY = tile.y;

		var layer0Config = this.backgroundTileData[ tileBiome ][ tileType ];
		var coordinates0 = layer0Config.coordinates[ Math.floor( Math.random()* layer0Config.coordinates.length ) ];

		tile.tileSizeLayer0X = layer0Config.tileSize.x;
		tile.tileSizeLayer0Y = layer0Config.tileSize.y;
		tile.layer0 = this.ctxBackground;
		tile.graphicsIndexLayer0 = coordinates0; //type; earth
		tile.tileTypeGraphicIndex = this.backgroundTileset;
		tile.graphicsX = tile.x * tile.tileSizeLayer0X; // graphics grid;
		tile.graphicsY = tile.y * tile.tileSizeLayer0Y;

		if( !( tileCover == "nothing" ) ){
			var layer1Config = this.coverTileData[ tileBiome ][ tileCover ];
			var coordinates1 = layer1Config.coordinates[ Math.floor( Math.random() * layer1Config.coordinates.length ) ];
			tile.layer1 = this.ctxCover;
			tile.graphicsIndexLayer1 = coordinates1; //cover; grass/tree
			tile.tileSizeLayer1X = layer1Config.tileSize.x;
			tile.tileSizeLayer1Y = layer1Config.tileSize.y;	
			tile.tileCoverGraphicIndex = this.coverTileset;
		};		

		tile.tileEffectGraphicIndex = null;
		//this.ctxBackground , this.backgroundTileset, this.canvasCoverLayer, this.coverLayerTileset; backgroundTileData, coverTileData;
		// "coordinates": [{ "x": 0, "y": 0 }],
        // "tileSize": { "x": 64, "y": 64 }

	}

	return GraphicsManager;
}());