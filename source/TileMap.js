var TileMap = (function(){
	function TileMap( parent, newGridSize ){
		this.grid = null;
		this.width = null;
		this.height = null;
		init( parent, newGridSize );
	}
	TileMap.prototype.getParent = function(){
		return parent;
	};
	TileMap.prototype.generateGrid = function( params ){
		this.width = params.width;
		this.height = params.height; 
		this.type = params.type;
		this.grid = new Array();
		this.fillBiome();
	};

	TileMap.prototype.createTile = function( id, y, x ){
		//type= 0 - water, 1 - earth , 2 - rock
		//cover= 0 - nothing, 1 - grass, 2 - sand, 3 - rock, 4 - wood, 5 - rockyRoad;
		var tile;
		var type = 1; //default earth;
		var cover = 0; //default nothing;
		var effect = 0; //default nothing;
		var walkable = true; //default - yes;
		tile = new Tile ( id, x, y, type, cover, effect, walkable );

		return tile;
	};

	TileMap.prototype.fillBiome = function( params ){





		var height = this.height;
		var width = this.width;

		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++ ){
				var id = i*width + j;
				var tile = this.createTile( id, i*width, j ); // create earth base map;
				this.grid.push( tile );
			}
		}
	};

	TileMap.prototype.draw = function(){
	    parent.getParent().getParent().getManager( "graphics" ).draw( this.grid, this.width, this.height, gridSize );
	};

	TileMap.prototype.changeTile = function( oldTile, newTile ){

	};

	var parent = null;
	var inited = false;
	var gridSize = null;

	var init = function( newParent, newGridSize ){
		if( !inited ){
			parent = newParent;
			gridSize = newGridSize;
			inited = true;
		}else{
			console.log( "TileMap already inited." );
			return;
		}
		
	};

	return TileMap;
}());