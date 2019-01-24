var TileMap = (function(){
	function TileMap( parent, newGridSize, tableBlock ){
		this.grid = null;
		this.width = null;
		this.height = null;
		this.tableBlock = document.getElementById( tableBlock );
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
		var height = this.height;
		var width = this.width;

		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++ ){
				var id = i*width + j;
				var tile = this.createTile( id, i*width, j );
				this.grid.push( tile );
			}
		}

	};

	TileMap.prototype.createTile = function( id, y, x ){
		//type= 0 - water, 1 - earth , 2 - rock, 3 - road ; 4 - wall; 5 - door; 6 - bridge, 7 - floor
		//cover= 0 - water, 1 - earth, 2 - grass, 3 - sand, 4 - rock, 5 - asphalt, 6 - wood;  
		var levelTile = levelOne[id];
		var tile;
		var type;
		var cover;
		var walkable;
		if( levelTile === "G" ){ // grass
			type = 1;
			cover = 2;
			walkable = 1;
			tile = new Tile ( id, x, y, type, cover, walkable );
		}else if( levelTile === "W" ){ //wall
			type = 4;
			cover = 4;
			walkable = 0;
			tile = new Tile ( id, x, y, type, cover, walkable );
		}else if( levelTile === "X" ){ //floor
			type = 7;
			cover = 6;
			walkable = 1;
			tile = new Tile ( id, x, y, type, cover, walkable );
		}else if( levelTile === "w" ){ // water
			type = 0;
			cover = 0;
			walkable = 0;
			tile = new Tile ( id, x, y, type, cover, walkable );
		}else if( levelTile === "R" ){ // road
			type = 3;
			cover = 5;
			walkable = 1;
			tile = new Tile ( id, x, y, type, cover, walkable );
		}else if( levelTile === "D" ){ // door
			type = 5;
			cover = 6;
			walkable = 1;
			tile = new Tile ( id, x, y, type, cover, walkable );
		}else{
			console.log( "An error at TileMap.js. LevelTile is '" + levelTile + "'." );
		}
		return tile;
	};

	TileMap.prototype.draw = function(){
	    var map = this.grid;
	    var width = this.width;
	    var height = this.height;

	    var tableBlock = this.tableBlock;
	    
	    for( var i = 0; i < height; i++ ){
	        var tr = document.createElement("TR");

	        for( var j = 0; j < width; j++ ){
	            var td = document.createElement("TD");
	            td.style.width = gridSize + "px";
	            td.style.height = gridSize + "px";
	            var id = i*width + j;
	            td.id = id;
	            var color = doColor( map[id] );
	            td.bgColor = color;
	            tr.appendChild( td );
	        }

	        tableBlock.appendChild( tr );
	    }

	    $("td").click(function(){
	    console.log( $(this)[0].id );
	    });
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

	var doColor = function( tile ){
	    var tileType = tile.type;
	    var tileCover = tile.cover;
	    var color = "white";

	    if( tileType == 0 ){
	        if( tileCover == 0 ){
	            color = "42b9ed";
	        }
	    }else if( tileType == 1 ){
	        if( tileCover == 2 ){
	            color = "238224";
	        }
	    }else if( tileType == 2 ){
	        if( tileCover == 2 ){

	        }
	    }else if( tileType == 3 ){
	        if( tileCover == 5 ){
	            color = "262626";
	        }
	    }else if( tileType == 4 ){
	        if( tileCover == 4 ){
	            color = "b2bab2";
	        }
	    }else if( tileType == 5 ){
	        if( tileCover == 6 ){
	            color = "c18100";
	        }
	    }else if( tileType == 6 ){
	        if( tileCover == 6 ){

	        }
	    }else if( tileType == 7 ){
	        if( tileCover == 6 ){
	            color = "7c5b1d";
	        }
	    }

	    return color;
	};

	return TileMap;
}());