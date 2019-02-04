var Tile = (function() {
	function Tile( newId, newX, newY, params ){
	//public
		this.x = newX;
		this.y = newY;
		this.id = newId;
		//TODO: check parameters, put default, if 1 or more parameters n/a ;
		// log this in console, to see errors;
		this.tileType = params.tileType;
		this.tileCover = params.tileCover;
		this.tileEffect = params.tileEffect;
		this.walkable = params.walkable;
		this.speedRatio = params.speedRatio;
	}
	// TODO : need to remember last type, llike earth or sand, cause i want to  do wooden flat like a *type*, not a cover, so
	// need function who can change type correctly.

		//type= water, oil , lava, earth, sand, rock,
		//cover= 0 - nothing, 1 - waterGrass, 3 - earthGrass, 4 - sandGrass 5 - rock, 6 - wood, 7 - rockyRoad, 8 - stoneWall, 9 - woodenWall, 10 - door;
		//effect = 0 - nothing, snow, fire, blood, etc;

	//private

	return Tile;

}());