var Tile = (function() {
	function Tile( newId, newX, newY, tiletype, tileCover, tileEffect, isWalkable ){
	//public
		init( newId, newX, newY, tiletype, tileCover, tileEffect, isWalkable );
	}

	Tile.prototype.getCoords = function(){
		return{ x, y };
	};
	Tile.prototype.getId = function(){
		return id;
	};

	Tile.prototype.getParams = function( params ){
		if( params == "type" ){
			return type;
		}else if( params == "cover" ){
			return cover;
		}else if( params == "effect" ){
			return effect;
		}else if( params == "walkable" ){
			return walkable;
		}else{
			console.log("Error in Tile.getParams, params: " + params + " doesn't exist" );
		}
	};

	Tile.prototype.setParams = function( params, value ){
		if( params == "type" ){
			type = value;
		}else if( params == "cover" ){
			cover = value;
		}else if( params == "effect" ){
			effect = value;
		}else if( params == "walkable" ){
			walkable = value;
		}else{
			console.log("Error in Tile.setParams, params: " + params + " doesn't exist" );
		}
	}

	//private
	var x = null;
	var y = null;
	var id = null;
	var inited = false;
	var type = null;
	var cover = null;
	var effect = null;
	var walkable = false;

	var init = function( newId, newX, newY, tiletype, tileCover, tileEffect, isWalkable ){
		inited = true;
		x = newX;
		y = newY;
		id = newId;
		type = tiletype; // 0 - water, 1 - earth , 2 - rock, 
		cover = tileCover; //  0 - nothing, 1 - grass, 2 - sand, 3 - rock, 4 - wood, 5 - rockyRoad; wooden bridge, rock bridge;
		effect = tileEffect; // 0 - nothing, 1 - water, 2 - fire, 3 - ice, 4 - poison;
		walkable = isWalkable; // true or false;
	};

	return Tile;

}());