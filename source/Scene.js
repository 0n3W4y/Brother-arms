var Scene = (function(){
	function Scene( newParent, newId ){
	//public
		this.parent = newParent;
		this.tileMap = null;
		this.id = newId;
		
	};

	Scene.prototype.createTileMap = function( params ){
		this.tileMap = new TileMap( this );
		this.tileMap.generateGrid( params );
	};

	Scene.prototype.createEntity = function( entityType, params ){
		var newEntity = this.parent.entityManager.createEntity( entityType, params );
		return newEntity;
	};

	Scene.prototype.draw = function(){
		//TODO: draw all map and all objects on map, draw all entities on map;
		this.parent.parent.graphicsManager.drawTileMap( this.tileMap.grid, this.tileMap.height, this.tileMap.width, this.tileMap.tileSize );
	};


	//private
	return Scene;
}());