var GraphicsManager = (function(){
	function GraphicsManager( newParent, canvasLayers, images, gridTileSize ){
	//public

		this.parent = newParent;
		this.gridTileSize = gridTileSize;

		//canvas layers;
		this.canvasBackgroundLayer = canvasLayers.backgroundLayer;
		this.canvasBackgroundObjectLayer = canvasLayers.backgroundObjectLayer;
		this.canvasForegroundObjectLayer = canvasLayers.foregroundObjectLayer;
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

		//canvas context 2d;
		this.ctxBackground = this.canvasBackgroundLayer.getContext( "2d" );
		//this.ctxBackground.scale(0.25, 0.25);
		this.ctxBackgroundObjects = this.canvasBackgroundObjectLayer.getContext( "2d" );
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
		this.drawTileCover( grid );
		
	};

	GraphicsManager.prototype.drawBackgroundTileMap = function( grid, height, width ){
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

	GraphicsManager.prototype.drawTileCover = function( grid ){
		for( var i = 0; i < grid.length; i++ ){
			var tile = grid[ i ];
		}
	}

	GraphicsManager.prototype.storeTileDataToContainer = function( images ){
		this.backgroundTileData = new Object();
		this.backgroundObjectTileData = new Object();
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
			}else if( key === "backgroundObjectsTileset" ){
				container = this.backgroundObjectTileData;
				tileConfigContainer = images.backgroundObjectsTileset.backgroundObjectTileData;
				doStore = true;
			}else if( key === "foregroundObjectsTileset" ){
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
	}

	GraphicsManager.prototype.drawImagesToCanvas = function( image, canvas, tileData ){ 
		//Image: { x, y, tileSizeX, tileSizeY, coordsX, coordsY, scaleX, scaleY };
		canvas.drawImage( tileData, image.imageX, image.imageY, image.tileSizeX, image.tileSizeY, image.x, image.y, image.scaleX, image.scaleY );
		//TODO: check params from image and do errors;
	};
	
	GraphicsManager.prototype.findImagesForTile = function( tile ){
		//TODO: find any image from tile, to fill layer0, layer1, layer2, layer3 ( ground, groundobjects, foregroundobjects, effects)
		for( var key in this.backgroundTileData){
			if( key == tile.tileType ){
				return this.backgroundTileData[ key ];
			}
		}
		console.log( "Error in GraphicsManager.findImageForTileType, no image config for tileType: " + tileType );
		return null;
	};

	GraphicsManager.prototype.findImageForEntity = function( entity ){
		var image;

		return image;
	};

	return GraphicsManager;
}());