var TileMap = (function(){
	function TileMap( parent, newTileSize ){
		init( parent, newTileSize );
	}
	TileMap.prototype.getParent = function(){
		return parent;
	};

	TileMap.prototype.getTileSize = function(){
		return tileSize;
	};

	TileMap.prototype.getGrid = function(){
		return grid;
	};

	TileMap.prototype.getSize = function(){
		return {"width": width, "height": height};
	};

	TileMap.prototype.generateGrid = function( params ){
		width = params.width;
		height = params.height;
		type = params.type;
		grid = new Array();
		this.fillBiome( params );
	};

	TileMap.prototype.createTile = function( id, y, x ){
		//type= 0 - water, 1 - oil , 2 - lava,  3 - earth, 4 - sand, 5 - rock,
		//cover= 0 - nothing, 1 - waterGrass, 3 - earthGrass, 4 - sandGrass 5 - rock, 6 - wood, 7 - rockyRoad, 8 - stoneWall, 9 - woodenWall, 10 - door;
		var tile;
		var type = 1; //default earth;
		var cover = 0; //default nothing;
		var effect = 0; //default nothing;
		var walkable = true; //default - yes;
		tile = new Tile ( id, x, y, type, cover, effect, walkable );

		return tile;
	};

	TileMap.prototype.fillBiome = function( params ){

		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++ ){
				var id = i*width + j;
				var tile = this.createTile( id, i*width, j );
				grid.push( tile );
			}
		}
	};

	TileMap.prototype.changeTile = function( oldTile, newTile ){

	};

	var parent = null;
	var inited = false;
	var tileSize = null;
	var height = null;
	var width = null;
	var grid = null;

	var init = function( newParent, newTileSize ){
		if( !inited ){
			parent = newParent;
			tileSize = newTileSize;
			inited = true;
		}else{
			console.log( "TileMap already inited." );
			return;
		}
		
	};

	return TileMap;
}());