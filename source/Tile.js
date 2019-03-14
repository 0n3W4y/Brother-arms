var Tile = (function() {
	function Tile( newId, newX, newY, params ){
	//public
		this.id = newId;
		this.x = newX; //grid
		this.y = newY;
		this.graphicsX = null; // graphics grid;
		this.graphicsY = null;
		this.layer0 = null;
		this.layer1 = null;
		this.graphicsIndexLayer0 = null; //type; earth
		this.graphicsIndexLayer1 = null; //cover; grass/tree
		
		//TODO: check parameters, put default, if 1 or more parameters n/a ;
		// log this in console, to see errors;
		this.tileType = params.tileType;
		this.tileCover = params.tileCover;
		this.tileEffect = params.tileEffect;
		this.walkable = params.walkable;
		this.speedRatio = params.speedRatio;

		this.tileTypeGraphicIndex = null;
		this.tileCoverGraphicIndex = null;
		this.tileEffectGraphicIndex = null;
	}
	// TODO : need to remember last type, llike earth or sand, cause i want to  do wooden flat like a *type*, not a cover, so
	// need function who can change type correctly.

	return Tile;

}());