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
		this.ctxCover = this.canvasCoverLayer.getContext( "2d" );
		this.ctxForegroundObjects = this.canvasForegroundObjectLayer.getContext( "2d" );
		this.ctxEffects = this.canvasEffectsLayer.getContext( "2d" );
		this.ctxCharacters = this.canvasCharactersLayer.getContext( "2d" );
		this.ctxUi = this.canvasUiLayer.getContext( "2d" );

		this.storeTileDataToContainer( images );
		this.prepareGraphics();

		this.layer0NeedToUpdate = false;
		this.layer1NeedToUpdate = false;
		this.layer2NeedToUpdate = false;
		this.layer3NeedToUpdate = false;
		this.layer4NeedToUpdate = false;
		this.layer5NeedToUpdate = false;
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

	GraphicsManager.prototype.update = function( time ){
		if( this.layer0NeedToUpdate ){
			this.updateLayer0();
			this.layer0NeedToUpdate = false;
		};

		if( this.layer1NeedToUpdate ){
			this.updateLayer1();
			this.layer1NeedToUpdate = false;
		};

		if( this.layer2NeedToUpdate ){
			this.updateLayer2();
			this.layer2NeedToUpdate = false;
		};

		if( this.layer3NeedToUpdate ){
			//TODO: layer update;
			this.layer3NeedToUpdate = false;
		};

		if( this.layer4NeedToUpdate ){
			//TODO: layer update;
			this.layer4NeedToUpdate = false;
		};

		if( this.layer5NeedToUpdate ){
			//TODO: layer update;
			this.layer5NeedToUpdate = false;
		};
	};

	GraphicsManager.prototype.updateLayer0 = function(){
		this.ctxBackground.clearRect(0, 0, this.canvasBackgroundLayer.width, this.canvasBackgroundLayer.height );
		var grid = this.parent.sceneManager.activeScene.tileMap.grid;
		for( var i = 0; i < grid.length; i++ ){
			var tile = grid[ i ];
			var params = tile.getParamsToGraphicsManager( "layer0" );
			//"imageX", "imageY", "tileSizeX","tileSizeY","x","y","scaleX","scaleY","ctx","tiledata"
			//canvas, tileData, imageX, imageY, tileSizeX, tileSizeY, x, y, scaleX, scaleY
			this.drawImagesToCanvas( params.ctx, params.tiledata, params.imageX, params.imageY, params.tileSizeX, params.tileSizeY, params.x, params.y, params.scaleX, params.scaleY );
		};
	};

	GraphicsManager.prototype.updateLayer1 = function(){
		this.ctxCover.clearRect(0, 0, this.canvasCoverLayer.width, this.canvasCoverLayer.height );
		var grid = this.parent.sceneManager.activeScene.tileMap.grid;
		for( var i = 0; i < grid.length; i++ ){
			var tile = grid[ i ];
			if( !( tile.tileCover == "nothing" || tile.tileCover == "rock" ) ){
				var params = tile.getParamsToGraphicsManager( "layer1" );
				//"imageX", "imageY", "tileSizeX","tileSizeY","x","y","scaleX","scaleY","ctx","tiledata"
				//canvas, tileData, imageX, imageY, tileSizeX, tileSizeY, x, y, scaleX, scaleY
				var x = params.x - ( params.tileSizeX - this.gridTileSize );
				var y = params.y - ( params.tileSizeY - this.gridTileSize );
				this.drawImagesToCanvas( params.ctx, params.tiledata, params.imageX, params.imageY, params.tileSizeX, params.tileSizeY, x, y, params.scaleX, params.scaleY );
			};			
		};
	};

	GraphicsManager.prototype.updateLayer2 = function(){
		this.ctxForegroundObjects.clearRect(0, 0, this.canvasForegroundObjectLayer.width, this.canvasForegroundObjectLayer.height );
		var activeSceneId = this.parent.sceneManager.activeScene.id;
		var container = this.parent.sceneManager.entityManager.objectEntities[ activeSceneId ].resources;
		for( var i = 0; i < container.length; i++ ){
			
		}
	};

	GraphicsManager.prototype.storeTileDataToContainer = function( images ){
		this.backgroundTileData = {};
		this.coverTileData = {};
		this.foregroundObjectTileData = {};
		this.effectsTileData = {};
		this.charactersTileData = {};
		this.uiTileData = {};

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

	GraphicsManager.prototype.drawImagesToCanvas = function( canvas, tileData, imageX, imageY, tileSizeX, tileSizeY, x, y, scaleX, scaleY ){ 
		//Image: { x, y, tileSizeX, tileSizeY, coordsX, coordsY, scaleX, scaleY };
		canvas.drawImage( tileData, imageX, imageY, tileSizeX, tileSizeY, x, y, scaleX, scaleY );
		//TODO: check params from image and do errors;
	};

	GraphicsManager.prototype.findImageConfigForEntity = function( entity ){
		var image;

		return image;
	};

	GraphicsManager.prototype.setConfigForBackgroundTile = function( tile ){
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

		if( !( tileCover == "nothing" || tileCover == "rock" ) ){
			var layer1Config = this.coverTileData[ tileBiome ][ tileCover ];
			var coordinates1 = layer1Config.coordinates[ Math.floor( Math.random() * layer1Config.coordinates.length ) ];
			tile.layer1 = this.ctxCover;
			tile.graphicsIndexLayer1 = coordinates1; //cover; grass
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