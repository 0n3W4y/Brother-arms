var Tile = (function() {
	function Tile( newId, newX, newY, params ){
	//public
		this.x = newX;
		this.y = newY;
		this.id = newId;
		this.tileType = params.tileType;
		this.tileCover = params.tileCover;
		this.tileEffect = params.tileEffect;
		this.walkable = params.walkable;
		this.speedRatio = params.speedRatio;
	}


	//private

	return Tile;

}());