var Tile = (function() {
	function Tile( newId, newX, newY, type, cover, walkable ){
		init( newId, newX, newY );
		this.type = type; // 0 - water, 1 - earth , 2 - rock, 3 - road ; 4 - wall; 5 - door; 6 - bridge, 7 - floor
		this.cover = cover; //  0 - water, 1 - earth, 2 - grass, 3 - sand, 4 - rock, 5 - asphalt, 6 - wood; 
		this.walkable = walkable || 1; // 1 - yes, 0 - no.
	}

	Tile.prototype.getCoords = function(){
		return{ x, y };
	};
	Tile.prototype.getId = function(){
		return id;
	};

	var x = null;
	var y = null;
	var id = null;
	var inited = false;

	var init = function( newId, newX, newY ){
		inited = true;
		x = newX;
		y = newY;
		id = newId;
	};

	return Tile;

}());